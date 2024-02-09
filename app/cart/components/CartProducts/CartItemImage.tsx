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
    className="mb-4 lg:mb-0 min-h-[10rem] lg:min-h-0 h-11/12 w-1/2 lg:w-10/12 bg-white rounded-lg flex justify-center items-center"
      href={`/produto/${produto.id}`}
      aria-label={`Ver detalhes do produto: ${produto.name}`}
    >
      <Image src={variavel.image} alt={produto.name} width={100} height={100} />
    </Link>
  );
}
