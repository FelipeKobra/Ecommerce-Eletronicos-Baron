import { NextResponse } from "next/server";
import Stripe from "stripe";

import prisma from "@/libs/prismaDb";

import { OrderDataType } from "../types/orderData";




interface createPaymentIntentProps {
  stripe: Stripe;
  total: number;
  orderData: OrderDataType;
}

export default async function createPaymentIntent({
  stripe,
  total,
  orderData,
}: createPaymentIntentProps) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
    });

    orderData.payment_intent_id = paymentIntent.id;

    await prisma.order.create({ data: orderData });

    return NextResponse.json({ paymentIntent: paymentIntent });
  } catch (error: any) {
    throw new Error(error);
  }
}
