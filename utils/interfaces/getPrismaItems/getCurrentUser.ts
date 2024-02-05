import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import prisma from "@/libs/prismaDb";



export async function getSession() {
  return await getServerSession();
}

export default async function getCurrentUser() {
  try {
    const session = await getServerSession();

    if (!session?.user.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: { Orders: { include: { products: true } } },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toString() || null,
    };
  } catch (error) {
    return null;
  }
}

export type UserQueryResult = Prisma.PromiseReturnType<typeof getCurrentUser>;
