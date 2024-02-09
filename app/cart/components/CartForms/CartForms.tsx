"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useEffect, useState } from "react";

import formatPrice from "@/utils/Formaters/formatPrice";
import { AcharProdutosDoCarrinhoType } from "@/utils/interfaces/getPrismaItems/getProductsFromCart";
import { LocalStorageItem } from "@/utils/providers/LocalStorageProvider";

interface CartForms {
  user: boolean;
  CartItems: LocalStorageItem[];
  produtosDoCarrinho: AcharProdutosDoCarrinhoType | null;
}

export default function CartForms({
  user,
  CartItems,
  produtosDoCarrinho,
}: CartForms) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const productQuantities = CartItems.map((item) => {
      if (produtosDoCarrinho) {
        const produtoDoItem = produtosDoCarrinho.find(
          (produto) =>
            produto?.variavel.productId === item.productId &&
            produto.variavel.color === item.color
        )?.variavel;

        if (produtoDoItem) return produtoDoItem.price * item.quantity;
      }
    });

    const totalPrice = productQuantities.reduce((act, acc) => act! + acc!);

    setTotalPrice(totalPrice ? totalPrice : 0);
  }, [CartItems, produtosDoCarrinho]);

  return (
    <div className="flex flex-col gap-4  justify-center w-full lg:w-3/4 xl:w-1/2 ">
      <div className="flex gap-8 xl:gap-0 justify-between w-full text-2xl font-semibold">
        <p>Subtotal</p>
        <p>{formatPrice(totalPrice)}</p>
      </div>

      <p className="w-full text-sm">Impostos e frete calculados no Checkout</p>
      <Link className="w-full h-[3rem]" href={user ? "/checkout" : "login"}>
        <button
          className={`h-full w-full rounded-md text-xl ${
            user
              ? "bg-base-content text-base-100 hover:bg-primary duration-300"
              : "border-solid border-4 bg-base-100 text-base-content hover:scale-110 duration-300"
          }`}
        >
          {user ? "Finalizar compra" : "Realize o Login"}
        </button>
      </Link>
      <Link className="w-full text-primary" href="/">
        <ArrowBackIcon /> Continue as Compras{" "}
      </Link>
    </div>
  );
}
