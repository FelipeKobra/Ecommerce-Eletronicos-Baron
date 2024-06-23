"use client";

import { useEffect } from "react";

interface QuantityChanger {
  selling: boolean;
  quantidade: number;
  cartQuantity: number;
  stock: number;

  setQuantidade: (quantidade: number) => void;
}

export default function QuantityChanger({
  quantidade,
  cartQuantity,
  stock,
  selling,
  setQuantidade,
}: QuantityChanger) {
  const quantidadeTotal = quantidade + cartQuantity;

  useEffect(() => {
    if (quantidadeTotal > stock) {
      let newQuantidade = Math.min(quantidade, stock - cartQuantity) + 1
      if (newQuantidade + cartQuantity > stock) {
        newQuantidade = 1;
      }
      setQuantidade(newQuantidade);
    }
  }, [quantidadeTotal, setQuantidade, stock, cartQuantity, quantidade]);

  function alterarQuantidade(e: React.MouseEvent<HTMLButtonElement>) {
    const sinal = (e.target as HTMLButtonElement).name;
    if (sinal === "diminuir") {
      if (quantidade > 1) {
        setQuantidade(quantidade - 1);
      }
    } else {
      if (quantidadeTotal < stock) {
        setQuantidade(quantidade + 1);
      }
    }
  }

  if (cartQuantity === stock || cartQuantity > stock) {
    if (stock === 0) {
      return <div></div>;
    } else {
      return;
    }
  } else if (stock > 0 && selling) {
    return (
      <div className="flex items-center gap-4 h-14">
        <p className="text-lg font-bold mr-5">Quantidade</p>
        <button
          name="diminuir"
          onClick={alterarQuantidade}
          className="border-solid border-2 rounded-xl px-4"
        >
          -
        </button>
        <p>{quantidade}</p>
        <button
          name="aumentar"
          onClick={alterarQuantidade}
          className="border-solid border-2 rounded-xl px-4"
        >
          +
        </button>
        {stock === quantidadeTotal && (
          <p className="text-error">Limite do Estoque Atingido</p>
        )}
      </div>
    );
  } else {
    return;
  }
}
