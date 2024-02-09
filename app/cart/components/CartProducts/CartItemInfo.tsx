import { ProductVariable } from "@prisma/client";
import Link from "next/link";
import { MouseEvent } from "react";

import truncateNames, { PascalName } from "@/utils/Formaters/formatName";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

interface CartItemInfoProps {
  produto: ProductType;
  variavel: ProductVariable;
  removerItem: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

export default function CartItemInfo({
  produto,
  variavel,
  removerItem,
}: CartItemInfoProps) {
  produto = produto!;
  return (
    <>
      <Link href={`/produto/${produto.id}`} role="link">
        <p>{truncateNames(produto.name)}</p>
      </Link>
      <p className="select-none">{PascalName(variavel.color)}</p>
      <button
        onClick={removerItem}
        name={variavel.color}
        value={produto.id}
        className="text-error link-hover link-error self-center lg:self-start w-full sm:w-1/2 md:w-1/4 lg:w-auto h-[3rem] lg:h-auto"
        aria-label={`Remover produto ${produto.name}`}
      >
        Remover
      </button>
    </>
  );
}
