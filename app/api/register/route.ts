import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const alreadyExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (alreadyExists) {
    return NextResponse.json({
      error: "Essa conta já está em uso, utilize outro email",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
  }
}
