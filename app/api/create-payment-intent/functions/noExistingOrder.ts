
import { Order } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import prisma from "@/libs/prismaDb";

import { OrderDataType } from "../types/orderData";



interface noExistingOrderProps {
  orderData: OrderDataType;
  current_intent: Stripe.Response<Stripe.PaymentIntent>;
  stripe: Stripe;
  total: number;
}

export default async function noExistingOrder({
  orderData,
  current_intent,
  stripe,
  total,
}: noExistingOrderProps) {
  orderData.payment_intent_id = current_intent.id;

 await stripe.paymentIntents.update(
      current_intent.id,
      { amount: total }
    );
  await prisma.order.create({ data: orderData });

  return NextResponse.json({
    paymentIntent: current_intent,
  });
}
