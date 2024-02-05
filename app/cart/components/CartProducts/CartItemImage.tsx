import { ProductVariable } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";



interface CartItemImage {
  produto: ProductType;
  variavel: ProductVariable;
}

export default function CartItemImage({ produto, variavel }: CartItemImage) {
  produto = produto!;
  return (
    <Link
      href={`/produto/${produto.id}`}
      aria-label={`Ver detalhes do produto: ${produto.name}`}
    >
      <Image src={variavel.image} alt={produto.name} width={100} height={100} />
    </Link>
  );
}
