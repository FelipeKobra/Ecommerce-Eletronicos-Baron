import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismaDb";

export interface getProductsProps {
  category?: string | null;
  searchTerm?: string | null;
  take?: number | null;
  dateOrder?: "asc" | "desc" | null;
  selling?: true | false | null;
}

export default async function getProducts(params: getProductsProps) {
  try {
    const { category, searchTerm, take, dateOrder, selling } = params;
    let searchString = searchTerm;

    if (!searchString) {
      searchString = "";
    }

    let query: any = {};

    if (selling) {
      query.selling = selling;
    }

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: { contains: searchString, mode: "insensitive" },
          },
          {
            description: { contains: searchString, mode: "insensitive" },
          },
          {
            brand: { contains: searchString, mode: "insensitive" },
          },
        ],
      },
      include: {
        ProductVariable: true,
      },
      take: take || undefined,
      orderBy: { createdDate: dateOrder || undefined },
    });
    if (!products) return [];
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export type ProductArrayType = Prisma.PromiseReturnType<typeof getProducts>;
