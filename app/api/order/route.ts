
import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

export async function PUT(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus: deliveryStatus },
  });

  return NextResponse.json(order);
}
