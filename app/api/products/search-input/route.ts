import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDb";

export async function POST(req: Request) {
  const body = await req.json();
  let {
    searchInput,
    take,
    createdDate,
  }: { searchInput: string; take: number; createdDate: "asc" | "desc" | null } =
    body;

  if (!createdDate) createdDate = "desc";

  if (searchInput) {
    try {
      const products = await prisma.product.findMany({
        where: {
          selling: true,
          OR: [
            { name: { contains: searchInput, mode: "insensitive" } },
            { brand: { contains: searchInput, mode: "insensitive" } },
            { description: { contains: searchInput, mode: "insensitive" } },
            { category: { contains: searchInput, mode: "insensitive" } },
          ],
        },
        include: {
          ProductVariable: true,
        },
        take: take,
        orderBy: { createdDate: createdDate },
      });

      if (!products || products.length === 0) return NextResponse.json([]);
      return NextResponse.json(products);
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  } else {
    return NextResponse.json([]);
  }
}
