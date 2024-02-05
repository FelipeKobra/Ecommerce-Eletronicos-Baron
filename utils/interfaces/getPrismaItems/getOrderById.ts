import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismaDb";


export default async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { address: true, products: true },
    });
    if (!order) return null;
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}

export type OrderByIdQueryResult = Prisma.PromiseReturnType<
  typeof getOrderById
>;
