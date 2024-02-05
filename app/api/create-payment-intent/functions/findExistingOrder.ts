import Stripe from "stripe";

import prisma from "@/libs/prismaDb";


export default async function findExistingOrder(
  actualIntent: Stripe.Response<Stripe.PaymentIntent>
) {
  try {
    const existingOrder = await prisma.order.findFirst({
      where: { payment_intent_id: actualIntent.id },
    });

    return existingOrder;
  } catch (error:any) {
    throw new Error(error);
  }
}
