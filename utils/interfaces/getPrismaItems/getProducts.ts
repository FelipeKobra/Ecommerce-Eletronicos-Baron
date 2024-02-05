import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismaDb";


export interface getProductsProps {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: getProductsProps) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchString) {
      searchString = "";
    }

    let query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: { contains: searchString, mode: "insensitive" },
            description: { contains: searchString, mode: "insensitive" },
          },
        ],
      },
      include: {
        ProductVariable: true,
      },
    });
    if (!products) return [];
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export type ProductArrayType = Prisma.PromiseReturnType<typeof getProducts>;
