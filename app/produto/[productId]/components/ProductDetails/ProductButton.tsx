"use client";
import { MdDangerous,MdCheckCircle } from "react-icons/md";

interface ProductButton {
  isAdded: boolean;
  selling: boolean;
  stock: number;
  cartQuantity: number;
  addToCart: () => void;
}

export default function ProductButton({
  isAdded,
  selling,
  stock,
  cartQuantity,
  addToCart,
}: ProductButton) {
  if (cartQuantity === stock || cartQuantity > stock) {
    if (stock === 0) {
      return <div></div>;
    } else {
      return (
        <>
          <div className="flex items-center">
            <MdDangerous
              className="text-error mr-4 "
              size={30}
            />
            <p className="text-lg"> Limite de Estoque Atingido no Carrinho</p>
          </div>
        </>
      );
    }
  } else if (stock > 0 && selling) {
    return (
      <>
        {!isAdded ? (
          <button
            onClick={addToCart}
            className="bg-base-content text-base-100 rounded-md h-[3rem] w-full hover:bg-primary duration-300"
          >
            Adicionar ao Carrinho
          </button>
        ) : (
          <div className="flex items-center">
            <MdCheckCircle
              className="text-success mr-4"
            size={30}
            />
            <p className="text-lg"> Produto Adicionado ao Carrinho</p>
          </div>
        )}
      </>
    );
  } else if (!selling) {
    return (
      <>
        <div className="flex items-center">
          <MdDangerous className="text-error mr-4" size={30} />
          <p className="text-lg"> Produto Não está À Venda</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center">
          <MdDangerous className="text-error mr-4" size={30} />
          <p className="text-lg"> Produto Fora de Estoque</p>
        </div>
      </>
    );
  }
}
