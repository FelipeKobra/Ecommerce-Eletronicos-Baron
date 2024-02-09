import { getStorage } from "firebase/storage";
import { NextResponse } from "next/server";

import firebaseApp from "@/libs/firebase";
import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

interface handleUserImageAPIData {
  user_id: string;
  imagePath: string;
  imageURL: string;
}

//Esse caminho é feito para troca de imagens
export async function PUT(req: Request) {
  const user = await getCurrentUser();

  try {
    const body: handleUserImageAPIData = await req.json();
    const { imageURL, imagePath, user_id } = body;

    if (!user || (user?.id !== user_id && user.role !== "ADMIN")) {
      return NextResponse.error();
    }

    const confirmationImage = await prisma.user.update({
      where: { id: user_id },
      data: { imagePath: imagePath, image: imageURL },
    });

    return NextResponse.json(confirmationImage);
  } catch (error: any) {
    console.log(error)
    throw new Error(error);
  }
}
