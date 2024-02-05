import { deleteObject, getStorage, ref } from "firebase/storage";
import { NextResponse } from "next/server";

import firebaseApp from "@/libs/firebase";
import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await prisma.product.findUnique({
      where: { id: params.id },
      include: { ProductReview: true, ProductVariable: true },
    });

    return NextResponse.json(produto);
  } catch (error: any) {
    NextResponse.error();
    throw new Error(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const storage = getStorage(firebaseApp);
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const productImages = await prisma.productVariable.findMany({
      where: { productId: params.id },
      select: { image: true },
    });

    const imageArray = productImages.map((product) => product.image);

    for (const image of imageArray) {
      const imageRef = ref(storage, image);
      await deleteObject(imageRef);
    }

    const product = await prisma.product.delete({ where: { id: params.id } });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.error();
  }
}
