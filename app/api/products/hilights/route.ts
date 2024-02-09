import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDb";

export async function GET(req: Request) {
  const body = await req.json();
  const { rate }: { rate: "best" | "worst" } = body;

  if (rate) {
    try {
      const topProductsData = await prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: {
          quantity: true,
        },
        take: 15,
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
      });

      const topProductIds = topProductsData.map((product) => product.productId);

      const topProductsArray = await prisma.product.findMany({
        where: { id: { in: topProductIds } },
        include: { ProductVariable: true },
      });

      if (!topProductsArray || topProductsArray.length === 0)
        return NextResponse.json([]);
      return NextResponse.json(topProductsArray);
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  } else {
    return NextResponse.json([]);
  }
}
