"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";
import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

import HorizontalRuleDesc from "./ProductDetails/HorizontalRuleDesc";
import ProductButton from "./ProductDetails/ProductButton";
import ProductColorSelector from "./ProductDetails/ProductColorSelector";
import ProductDescription from "./ProductDetails/ProductDescription";
import ProductImage from "./ProductDetails/ProductImage";
import ProductInfo from "./ProductDetails/ProductInfo";
import ProductRating from "./ProductDetails/ProductRating";
import ProductTitle from "./ProductDetails/ProductTitle";
import QuantityChanger from "./ProductDetails/QuantityChanger";

export default function ProductDetails({ produto }: { produto: ProductType }) {
  //Context And CartQuantity Declare
  const { getLocalStorage, setCartLocalStorage, cartVolume } =
    useContext(LocalStorageContext);

  //States
  const [cartQuantity, setCartQuantity] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  //Declaração das Reviews e Variáveis dos Produtos
  let reviews = produto?.ProductReview;
  let variaveis = produto?.ProductVariable;

  if (!variaveis) variaveis = [];
  if (!reviews) reviews = [];

  //Conts Formatters
  const imagens = variaveis.map((e) => e.image);
  const variavelAtual = variaveis[imageIndex];
  const notasProduto = reviews.map((e) => e.rating);
  const notaFinalProduto = Math.floor(
    notasProduto.reduce((curr: number, acc: number) => curr + acc, 0) /
      reviews.length || 0
  );

  useEffect(() => {
    const productsInCart = getLocalStorage();
    if (!productsInCart) {
      setCartQuantity(0);
      return;
    }

    if (!produto) return;

    // Encontra o produto com a mesma ID e cor no carrinho
    const produtoNoCarrinho = productsInCart.find(
      (e) => e.productId === produto.id && e.color === variavelAtual.color
    );

    setCartQuantity(produtoNoCarrinho?.quantity || 0);
  }, [cartVolume, getLocalStorage, imageIndex, variavelAtual.color, produto]);

  //Add to Cart
  function addToCart() {
    produto &&
      setCartLocalStorage({
        productId: produto.id,
        quantity: quantidade,
        color: variavelAtual.color,
      });
    toast.success("Produto Adicionado Com Sucesso");
    setIsAdded(true);
    router.push("/cart");
  }

  //Router
  const router = useRouter();

 if(produto) return (
    <div className="w-full grid grid-cols-2 my-8">
      <ProductImage
        imagens={imagens}
        imageIndex={imageIndex}
        name={produto.name}
      />

      <div className="col-span-2 lg:col-span-1 px-10 lg:p-0 my-10 lg:m-0 flex flex-col gap-4">
        <ProductTitle name={produto.name} price={variavelAtual.price} />
        <ProductRating notaFinal={notaFinalProduto} notas={notasProduto} />
        <ProductDescription produto={produto} />
        <ProductInfo
          categoria={produto.category}
          brand={produto.brand}
          stock={variavelAtual.stock}
        />
        <HorizontalRuleDesc />
        <ProductColorSelector
          variaveis={variaveis}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
        <HorizontalRuleDesc />
        <QuantityChanger
          selling={produto.selling}
          quantidade={quantidade}
          stock={variavelAtual.stock}
          setQuantidade={setQuantidade}
          cartQuantity={cartQuantity}
        />
        <div className="mt-5 h-14 w-full sm:w-10/12 md:w-1/2">
          <ProductButton
            selling={produto.selling}
            cartQuantity={cartQuantity}
            isAdded={isAdded}
            addToCart={addToCart}
            stock={variavelAtual.stock}
          />
        </div>
      </div>
    </div>
  );
}
