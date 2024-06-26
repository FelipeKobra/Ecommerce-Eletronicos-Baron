import { OrderItem } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import createPaymentIntent from "./functions/createPaymentIntent";
import findExistingOrder from "./functions/findExistingOrder";
import noCurrentIntent from "./functions/noCurrentIntent";
import noExistingOrder from "./functions/noExistingOrder";
import updatePaymentIntentAndOrder from "./functions/updatePaymentIntentAndOrder";
import updateProductDetails from "./functions/updateProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Sem autorização, realize o login e tente novamente" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const {
    items,
    payment_intent_id,
  }: { items: OrderItem[]; payment_intent_id: string | null } = body;

  try {
    await updateProductDetails(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const itemTotalPrice = items
    .map((item) => item.price * item.quantity)
    .reduce((act, acc) => act + acc);

  const total = Math.round(itemTotalPrice * 100);
  if (total === 0) {
    return NextResponse.json(
      { error: "O carrinho está vazio" },
      { status: 400 }
    );
  }

  const FloatTotal = total / 100;

  let orderData = {
    userId: currentUser.id,
    amount: FloatTotal,
    currency: "brl",
    payment_intent_id: payment_intent_id!,
    products: {
      create: items.map((item) => {
        return {
          name: item.name,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          price: item.price,
          image: item.image,
        };
      }),
    },
  };

  if (payment_intent_id) {
    try {
      const current_intent =
        await stripe.paymentIntents.retrieve(payment_intent_id);

      if (!current_intent) return noCurrentIntent();

      if (current_intent) {
        const existingOrder = await findExistingOrder(current_intent);

        if (!existingOrder)
          return await noExistingOrder({
            current_intent,
            orderData,
            stripe,
            total,
          });

        try {
          return await updatePaymentIntentAndOrder({
            payment_intent_id: current_intent.id,
            stripe,
            items,
            FloatTotal,
            total,
          });
        } catch (error) {
          return await createPaymentIntent({ stripe, orderData, total });
        }
      }
    } catch (error) {
      return noCurrentIntent();
    }
  } else if (!payment_intent_id) {
    try {
      const existingOrder = await prisma.order.findFirst({
        where: { userId: currentUser.id, status: "Pendente" },
      });

      if (existingOrder) {
        try {
          const current_intent = await stripe.paymentIntents.retrieve(
            existingOrder.payment_intent_id
          );

          if (!current_intent) return noCurrentIntent();

          try {
            return await updatePaymentIntentAndOrder({
              payment_intent_id: current_intent.id,
              FloatTotal,
              items,
              stripe,
              total,
            });
          } catch (error) {
            return await createPaymentIntent({ stripe, orderData, total });
          }
        } catch (error) {
          return noCurrentIntent();
        }
      } else if (existingOrder === null) {
        return await createPaymentIntent({ stripe, orderData, total });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Erro ao criar Intent de pagamento" });
    }
  }
}
