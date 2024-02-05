import { PaymentStatus } from "@prisma/client";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import prisma from "@/libs/prismaDb";



export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buffed = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Não há assinatura do stripe");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buffed,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return res.status(400).send("Erro na criação do webhook:" + err);
  }

  if (event.type == "payment_intent.succeeded") {
    const charge = event.data.object;

    const addressData = {
      line1: charge.shipping?.address?.line1 || "",
      line2: charge.shipping?.address?.line2 || null,
      cidade: charge.shipping?.address?.city || "",
      estado: charge.shipping?.address?.state || "",
      pais: charge.shipping?.address?.country || "",
      CEP: charge.shipping?.address?.postal_code || "",
    };

    if (charge) {
      try {
        await prisma?.order.update({
          where: { payment_intent_id: charge.id },
          data: {
            status: PaymentStatus.Realizado,
            address: {
              upsert: {
                create: addressData,
                update: addressData,
              },
            },
          },
        });
        res.send({ received: true });
      } catch (err: any) {
        return res
          .status(400)
          .send("Erro na atualização do status do pagamento:" + err);
      }
    }
  }

  res.send({ received: true });
}
