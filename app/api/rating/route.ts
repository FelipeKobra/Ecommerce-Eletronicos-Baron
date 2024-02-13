
import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDb"
import checkAuthToReview from "@/utils/functions/checkAuthToReview";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

export interface bodyRatingProps {
  comment: string;
  rating: number;
  userId: string;
  product: ProductType;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.error();
    }

    const body: bodyRatingProps = await req.json();
    const { comment, rating, product, userId } = body;

    const auth = checkAuthToReview({ product, user });
    if (!auth) {
      NextResponse.error();
    }

    const review = await prisma.productReview.create({
      data: { comment, rating, productId: product!.id, userId },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    throw new Error(error);
  }
}
