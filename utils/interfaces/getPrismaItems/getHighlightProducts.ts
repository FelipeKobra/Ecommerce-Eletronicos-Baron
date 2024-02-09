import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismaDb";

export async function getHighlightProducts() {
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

    if (topProductsArray.length < 15) {
      const additionalProducts = await prisma.product.findMany({
        where: { id: { notIn: topProductsArray.map((product) => product.id) } },
        include: { ProductVariable: true },
        take: 15 - topProductsArray.length,
      });
      topProductsArray.push(...additionalProducts);
    }

    if (!topProductsArray || topProductsArray.length === 0) return [];
    return topProductsArray;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export type ProductHighlightArrayType = Prisma.PromiseReturnType<
  typeof getHighlightProducts
>;
