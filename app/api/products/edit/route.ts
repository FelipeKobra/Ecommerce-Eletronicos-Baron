import { getStorage } from "firebase/storage";
import { NextResponse } from "next/server";

import { handleImageAPIData } from "@/app/admin/manage/types/handleImageProps";
import ProductRows from "@/app/admin/manage/types/ProductRows";
import firebaseApp from "@/libs/firebase";
import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body: ProductRows = await req.json();

  const {
    product_id,
    brand,
    category,
    name,
    selling,
    variable_id,
    image,
    price,
    quantity,
    color,
    colorCode,
  } = body;

  if (typeof price === "number" && typeof quantity === "number") {
    try {
      let newRow = await prisma.product.update({
        where: {
          id: product_id,
        },
        data: {
          brand,
          category,
          name,
          selling,
          ProductVariable: {
            update: {
              where: {
                id: variable_id,
              },
              data: {
                image,
                price,
                stock: quantity,
                color,
                colorCode,
              },
            },
          },
        },
        include: { ProductVariable: { where: { id: variable_id } } },
      });

      const variable = newRow.ProductVariable[0];

      const formatedNewRow = {
        ...newRow,
        image: variable.image,
        price: variable.price,
        quantity: variable.stock,
        color: variable.color,
        colorCode: variable.colorCode,
      };

      return NextResponse.json(formatedNewRow);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

//Esse caminho é feito para troca de imagens
export async function PUT(req: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body: handleImageAPIData = await req.json();
    const { imageURL, variableId } = body;

    const confirmationImage = await prisma.productVariable.update({
      where: { id: variableId },
      data: { image: imageURL },
    });

    return NextResponse.json(confirmationImage);
  } catch (error: any) {
    throw new Error(error);
  }
}
