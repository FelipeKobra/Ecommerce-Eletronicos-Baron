"use client";

import { MouseEvent, useContext, useEffect, useRef, useState } from "react";

import AcharProdutosDoCarrinho, {
  AcharProdutosDoCarrinhoType,
} from "@/utils/interfaces/getPrismaItems/getProductsFromCart";
import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

import CartForms from "./components/CartForms/CartForms";
import ClearCartBtn from "./components/CartForms/ClearCartBtn";
import CartRows from "./components/CartProducts/CartRows";
import Items from "./components/CartProducts/Items";
import NoItemPage from "./components/CartProducts/NoItemPage";

import LoadingScreen from "../components/LoadingScreen";

export default function CartProducts({ user }: { user: boolean }) {
  const {
    cartItems: CartItems,
    cartVolume,
    removeItem,
    removeLocalStorage,
  } = useContext(LocalStorageContext) || {};

  const removeItemHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { name: cor, value: productId } = e.target as HTMLButtonElement;
    removeItem?.(productId, cor);
  };

  const [produtosDoCarrinho, setProdutosDoCarrinho] =
    useState<AcharProdutosDoCarrinhoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const CartItemsCountRef = useRef(CartItems && CartItems.length);

  //Pegar todos os preços e stock da DB e relacionar com os itens do carrinho
  // First useEffect to fetch data
  useEffect(() => {
    (async function handleProdutosDoCarrinho() {
      if (CartItems && CartItems.length > 0) {
        if (CartItemsCountRef.current !== CartItems.length) {
          setIsLoading(true);
          CartItemsCountRef.current = CartItems.length;
        }
        try {
          const produtosDoCarrinhoTemp: AcharProdutosDoCarrinhoType =
            await AcharProdutosDoCarrinho({ CartItems });
          setProdutosDoCarrinho(produtosDoCarrinhoTemp);
        } catch (error) {
          console.error("Error Cart Products:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // No items, so we are not loading
        setIsLoading(false);
      }
    })();
  }, [CartItems]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!CartItems || CartItems.length <= 0 || !produtosDoCarrinho) {
    return <NoItemPage />;
  }

  return (
    <div className="px-[2rem] my-14">
      <div className="text-center my-5">
        <h1 className="text-5xl">Carrinho</h1>
      </div>
      <CartRows />
      <Items
        removerItem={removeItemHandler}
        produtosDoCarrinho={produtosDoCarrinho}
        CartItems={CartItems}
      />
      <hr className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 md:px-[4rem]">
        <div className="hidden lg:block">
          <ClearCartBtn
            cartSize={cartVolume}
            removeStorage={removeLocalStorage}
          />
        </div>
        <div className="flex lg:justify-end">
          <CartForms
            produtosDoCarrinho={produtosDoCarrinho}
            CartItems={CartItems}
            user={user}
          />
        </div>
        <div className="block lg:hidden pt-10">
          <ClearCartBtn
            cartSize={cartVolume}
            removeStorage={removeLocalStorage}
          />
        </div>
      </div>
    </div>
  );
}
