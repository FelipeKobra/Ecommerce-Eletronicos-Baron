import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismaDb";


export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId:userId },
      include: { user: true },
      orderBy: { createDate: "desc" },
    });
    if(!orders) return null
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}

export type OrdersByUserIdType = Prisma.PromiseReturnType<
  typeof getOrdersByUserId
>;
