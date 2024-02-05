import { NextResponse } from "next/server";

import { AddForm } from "@/app/admin/add/components/zodConfig/schemas";
import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, brand, category, variables, productId }: AddForm =
    body;

  if (productId) {
    const prismaResponse = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (prismaResponse) {
      try {
        const product = await prisma.product.update({
          where: { id: productId },
          data: {
            name: name,
            description: description,
            brand: brand,
            category: category,
            ProductVariable: {
              deleteMany: {},
              create: variables.map((productVariable) => {
                return {
                  color: productVariable.color,
                  colorCode: productVariable.colorCode,
                  image: productVariable.imageURL,
                  imagePath: productVariable.imagePath,
                  price: productVariable.price,
                  stock: productVariable.stock,
                };
              }),
            },
          },
        });
        return NextResponse.json(product);
      } catch (err) {
        console.log(
          "Não foi possível atualizar a Database com as informações novas do produto, devido à:" +
            err
        );
      }
    }
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        brand,
        category,
        ProductVariable: {
          create: variables.map((productVariable) => {
            return {
              color: productVariable.color,
              colorCode: productVariable.colorCode,
              image: productVariable.imageURL,
              imagePath: productVariable.imageURL,
              price: productVariable.price,
              stock: productVariable.stock,
            };
          }),
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(
      "Ocorreu um erro na criação do produto na Database devido à:" + error
    );
  }
  throw new Error();
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, isSelling } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { selling: isSelling },
  });

  return NextResponse.json(product);
}
