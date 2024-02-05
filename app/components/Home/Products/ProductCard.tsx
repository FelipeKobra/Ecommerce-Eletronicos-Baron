"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./ProductCard.module.css";
import checkNewProduct from "./utils/checkNewProduct";

import truncateNames from "@/utils/Formaters/formatName";
import formatPrice from "@/utils/Formaters/formatPrice";
import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

interface ProductCardProps {
  produto: ProductArrayType[0];
}

export default function ProductCard({ produto }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const primeiraVariavel = produto.ProductVariable[0];
  const nomeTruncado = truncateNames(produto.name);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card w-11/12 h-[28rem] bg-base-100 shadow-xl hover:shadow-2xl duration-150"
    >
      <Link href={"/produto/" + produto.id}>
        <div
          className={`flex flex-col bg-white duration-300 rounded-md  ${
            isHovered ? "opacity-100" : "opacity-75"
          }`}
        >
          <figure className="h-[17rem] ">
            <Image
              className="rounded-lg hover:scale-110 duration-300"
              width={170}
              height={160}
              src={primeiraVariavel.image}
              alt={`Imagem do Produto:${nomeTruncado}`}
            />
          </figure>
          {checkNewProduct(produto) && (
            <div
              className={`absolute right-2 top-2 self-end badge badge-secondary select-none ml-2 duration-300 ${styles["glow-secondary"]} `}
            >
              NOVO
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-4 my-3 text-center justify-center items-center">
        <Link href={"/produto/" + produto.id}>
          <h2 className="card-title text-xl font-medium block text-base-content ">
            {nomeTruncado}
            <br />
          </h2>
        </Link>

        <p className="text-base-content font-bold text-2xl select-none">
          {formatPrice(primeiraVariavel.price)}
        </p>

        <Link className="w-11/12" href={"/produto/" + produto.id}>
          <button className="btn btn-primary w-full text-lg">Compre Já!</button>
        </Link>
      </div>
    </div>
  );
}
