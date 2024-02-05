"use client";

import { MouseEvent, useContext, useEffect, useState } from "react";

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

  //Pegar todos os preços e stock da DB e relacionar com os itens do carrinho
  useEffect(() => {
    if (CartItems && isLoading) {
      (async function handleProdutosDoCarrinho() {
        try {
          const produtosDoCarrinhoTemp: AcharProdutosDoCarrinhoType =
            await AcharProdutosDoCarrinho({ CartItems: CartItems });

          setProdutosDoCarrinho(produtosDoCarrinhoTemp);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error("Error when handling produtosDoCarrinho: ", error);
        }
      })();
    }
  }, [CartItems, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!CartItems || CartItems.length <= 0 || !produtosDoCarrinho) {
    return <NoItemPage />;
  }

  return (
    <div className="px-[2rem]">
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
      <div className="grid grid-cols-2 px-[4rem]">
        <div>
          <ClearCartBtn
            cartSize={cartVolume}
            removeStorage={removeLocalStorage}
          />
        </div>
        <div>
          <CartForms
            produtosDoCarrinho={produtosDoCarrinho}
            CartItems={CartItems}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}
