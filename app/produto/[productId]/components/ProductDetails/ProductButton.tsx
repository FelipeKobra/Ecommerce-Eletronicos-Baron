"use client";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";

interface ProductButton {
  isAdded: boolean;
  stock: number;
  cartQuantity:number;
  addToCart: () => void;
}

export default function ProductButton({
  isAdded,
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
            <DangerousRoundedIcon
              className="text-error mr-4"
              fontSize="large"
            />
            <p className="text-lg"> Limite de Estoque Atingido no Carrinho</p>
          </div>
        </>
      );
    }
  } else if (stock > 0 ) {
    return (
      <>
        {!isAdded ? (
          <button
            onClick={addToCart}
            className="bg-base-content text-base-100 rounded-md h-[3rem] w-[22rem] hover:bg-primary duration-300"
          >
            Adicionar ao Carrinho
          </button>
        ) : (
          <div className="flex items-center">
            <CheckCircleRoundedIcon
              className="text-success mr-4"
              fontSize="large"
            />{" "}
            <p className="text-lg"> Produto Adicionado ao Carrinho</p>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center">
          <DangerousRoundedIcon className="text-error mr-4" fontSize="large" />{" "}
          <p className="text-lg"> Produto Fora de Estoque</p>
        </div>
      </>
    );
  }
}
