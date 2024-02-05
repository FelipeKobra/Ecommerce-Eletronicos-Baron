
import { OrderItem } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import prisma from "@/libs/prismaDb";


interface updatePaymentIntentAndOrderProps {
  payment_intent_id: string;
  total: number;
  FloatTotal: number;
  items: OrderItem[];
  stripe: Stripe;
}

export default async function updatePaymentIntentAndOrder({
  payment_intent_id,
  total,
  FloatTotal,
  items,
  stripe,
}: updatePaymentIntentAndOrderProps) {
  try {
    const updated_intent = await stripe.paymentIntents.update(
      payment_intent_id,
      { amount: total }
    );

    await prisma.order.update({
      where: { payment_intent_id: updated_intent.id },
      data: {
        amount: FloatTotal,
        products: {
          deleteMany: {},
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
      },
    });

    return NextResponse.json({ paymentIntent: updated_intent });
  } catch (error:any) {
    throw new Error(error);
  }
}
