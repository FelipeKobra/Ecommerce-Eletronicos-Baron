"use client";

import { MouseEvent } from "react";

import formatPrice from "@/utils/Formaters/formatPrice";
import { AcharProdutosDoCarrinhoType } from "@/utils/interfaces/getPrismaItems/getProductsFromCart";
import { LocalStorageItem } from "@/utils/providers/LocalStorageProvider";

import CartItemImage from "./CartItemImage";
import CartItemInfo from "./CartItemInfo";
import CartItemTotalPrice from "./CartItemTotalPrice";
import CartQuantityChanger from "./CartQuantityChanger";


interface ItemsProps {
  produtosDoCarrinho: AcharProdutosDoCarrinhoType | null;
  CartItems: LocalStorageItem[];
  removerItem: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Items({
  produtosDoCarrinho,
  CartItems,
  removerItem,
}: ItemsProps) {
  return (
    produtosDoCarrinho &&
    produtosDoCarrinho.length > 0 &&
    produtosDoCarrinho.map((CartItem) => {
      CartItem = CartItem!;

      const { item, produto, variavel } = CartItem;

      if (produto && variavel) {
        return (
          <div key={produto.id}>
            <hr />
            <div
              className="grid grid-cols-2 lg:grid-cols-5 justify-center items-center text-2xl lg:text-xl my-4 lg:px-[4rem]"
              aria-label={`${produto.name}, ${variavel.color}`}
            >
              <div className="col-span-2 grid grid-cols-1 lg:grid-cols-5 text-center lg:text-start">
                <div className="col-span-2 flex justify-center  w-full h-full ">
                  <CartItemImage produto={produto} variavel={variavel} />
                </div>

                <div className="col-span-2 flex flex-col gap-3 font-light lg:font-normal lg:items-start">
                  <CartItemInfo
                    produto={produto}
                    variavel={variavel}
                    removerItem={removerItem}
                  />
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1 py-8 text-2xl sm:text-3xl md:text-3xl lg:text-xl lg:p-0 justify-self-center select-none">
                {formatPrice(variavel.price)}
              </div>
              <div className="col-span-2 sm:col-span-1 justify-self-center flex justify-center items-center gap-6 text-2xl sm:text-3xl md:text-3xl lg:text-xl">
                <CartQuantityChanger
                  quantidade={item.quantity}
                  color={variavel.color}
                  productid={produto.id}
                  stock={variavel.stock}
                />
              </div>
              <div className="py-6 sm:py-0 col-span-2 sm:col-span-1 flex gap-1 justify-center text-center lg:text-start text-2xl sm:text-3xl md:text-3xl lg:text-xl">
                <p className="lg:hidden">TOTAL:</p>
                <CartItemTotalPrice variavel={variavel} CartItems={CartItems} />
              </div>
            </div>
          </div>
        );
      }
    })
  );
}
