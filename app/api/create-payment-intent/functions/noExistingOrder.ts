
import { Order } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import prisma from "@/libs/prismaDb";

import { OrderDataType } from "../types/orderData";



interface noExistingOrderProps {
  orderData: OrderDataType;
  current_intent: Stripe.Response<Stripe.PaymentIntent>;
}

export default async function noExistingOrder({
  orderData,
  current_intent,
}: noExistingOrderProps) {
  orderData.payment_intent_id = current_intent.id;

  await prisma.order.create({ data: orderData });

  return NextResponse.json({
    paymentIntent: current_intent,
  });
}
