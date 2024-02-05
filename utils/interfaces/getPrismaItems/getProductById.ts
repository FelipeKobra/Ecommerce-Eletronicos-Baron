
import { Prisma } from "@prisma/client";

import { ParamsProductProps } from "@/app/produto/[productId]/page";
import prisma from "@/libs/prismaDb";

export default async function getProductByIdParams(params: ParamsProductProps) {
  const { productId } = params;
  try {
    const produto = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        ProductReview: {
          include: { user: true },
          orderBy: { createdDate: "desc" },
        },
        ProductVariable: true,
      },
    });

    if (!produto) return null;
    return produto;
  } catch (error: any) {
    throw new Error(error);
  }
}

export type ProductType = Prisma.PromiseReturnType<typeof getProductByIdParams>;

export async function getProductById(productId: string) {
  try {
    const produto = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        ProductReview: {
          include: { user: true },
          orderBy: { createdDate: "desc" },
        },
        ProductVariable: true,
      },
    });

    if (!produto) return null;
    return produto;
  } catch (error: any) {
    throw new Error(error);
  }
}
