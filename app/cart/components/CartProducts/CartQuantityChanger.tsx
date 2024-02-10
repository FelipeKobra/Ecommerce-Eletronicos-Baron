"use client";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

interface QuantityChanger {
  productid: string;
  stock: number;
  color: string;
  quantidade: number;
}

export default function CartQuantityChanger({
  productid,
  stock,
  color,
  quantidade,
}: QuantityChanger) {
  const {
    cartVolume,
    getLocalStorage,
    updateCartQuantity,
    setCartLocalStorage,
  } = useContext(LocalStorageContext);

  const [quantity, setQuantity] = useState(quantidade);

  useEffect(() => {
    const cartQuantity = getLocalStorage()?.find(
      (item) => item.productId === productid
    )?.quantity;

    if (quantity <= 0 || (cartQuantity && cartQuantity <= 0)) {
      setCartLocalStorage({ color, productId: productid, quantity: 1 });
      setQuantity(1);
    }
    if (quantity > stock || (cartQuantity && cartQuantity > stock)) {
      setCartLocalStorage({ color, productId: productid, quantity: stock });
      setQuantity(stock);
    }
  }, [
    color,
    productid,
    stock,
    quantity,
    cartVolume,
    setCartLocalStorage,
    getLocalStorage,
  ]);

  function alterarQuantidade(e: React.MouseEvent<HTMLButtonElement>) {
    const sinal = (e.target as HTMLButtonElement).name;
    if (sinal === "diminuir") {
      if (quantity > 1) {
        updateCartQuantity({
          color: color,
          productId: productid,
          quantity: quantity - 1,
          inputName: "rmv",
        });
        setQuantity(quantity - 1);
      }
    } else if (quantity < stock) {
      updateCartQuantity({
        color: color,
        productId: productid,
        quantity: quantity + 1,
        inputName: "add",
      });
      setQuantity(quantity + 1);
    } else {
      toast.error("Limite do Estoque Atingido", { id: "CartLimit" });
    }
  }

  if (stock > 0) {
    return (
      <>
        <button
          name="diminuir"
          onClick={alterarQuantidade}
          className="border-solid border-2 rounded-xl px-4"
          aria-label={`Diminuir a quantidade de produto color ${color}`}
        >
          -
        </button>
        <p role="status" className="select-none">
          {quantity}
        </p>
        <button
          name="aumentar"
          onClick={alterarQuantidade}
          className="border-solid border-2 rounded-xl px-4"
          aria-label={`Aumentar a quantidade de produto color ${color}`}
        >
          +
        </button>
      </>
    );
  } else {
    return <div></div>;
  }
}
