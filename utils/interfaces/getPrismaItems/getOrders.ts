import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismaDb";


export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true },
      orderBy: { createDate: "desc" },
    });
    if(!orders) return null
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}

export type OrdersQueryResult = Prisma.PromiseReturnType<typeof getOrders>;
