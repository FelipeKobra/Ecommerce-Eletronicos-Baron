import { Prisma, ProductVariable } from "@prisma/client";
import axios from "axios";

import { LocalStorageItem } from "@/utils/providers/LocalStorageProvider";

import { ProductType, getProductById } from "./getProductById";




interface AcharProdutosDoCarrinhoProps {
  CartItems: LocalStorageItem[];
}

export default async function AcharProdutosDoCarrinho({
  CartItems,
}: AcharProdutosDoCarrinhoProps) {
  const source = axios.CancelToken.source();
  if (CartItems && CartItems.length > 0) {
    const produtosDoCarrinho = await Promise.all(
      CartItems.map(async (item) => {
        try {
          const response = await axios.get(`/api/products/${item.productId}`, {
            cancelToken: source.token,
          });

          const produto: ProductType = response.data;
          if (!produto) throw new Error();

          const variavel = produto.ProductVariable.find(
            (produto) => produto.color === item.color
          );
          if (!variavel) throw new Error();

          let produtoDoCarrinho = { item, produto, variavel };

          return produtoDoCarrinho;
        } catch (error: any) {
          if (!axios.isCancel(error)) {
            throw new Error(error);
          }
        }
      })
    );
    source.cancel("Operation canceled by the user.");
    return produtosDoCarrinho;
  }
}

export type AcharProdutosDoCarrinhoType = Prisma.PromiseReturnType<
  typeof AcharProdutosDoCarrinho
>;

interface AcharAtributoDeVariaveisDoCarrinhoProps {
  CartItems: LocalStorageItem[];
  Atributo: keyof ProductVariable;
}

export async function AcharAtributoDeVariaveisDoCarrinho({
  CartItems,
  Atributo,
}: AcharAtributoDeVariaveisDoCarrinhoProps) {
  const source = axios.CancelToken.source();
  try {
    if (CartItems && CartItems.length > 0) {
      const PrecosProdutosDoCarrinho = await Promise.all(
        CartItems.map(async (item) => {
          const response = await axios.get(`/api/products/${item.productId}`, {
            cancelToken: source.token,
          });

          const produto: ProductType = response.data;

          const variavel =
            produto &&
            produto.ProductVariable.find(
              (produto) => produto.color === item.color
            );
          return variavel && variavel[Atributo];
        })
      );

      source.cancel("Operation Canceled by the user");
      return PrecosProdutosDoCarrinho;
    }
  } catch (error: any) {
    if (!axios.isCancel(error)) throw new Error(error);
  }
}

interface AcharPrecoTotalCarrinhoProps {
  CartItems: LocalStorageItem[];
}

export async function AcharPrecoTotalCarrinho({
  CartItems,
}: AcharPrecoTotalCarrinhoProps) {
  const source = axios.CancelToken.source();
  try {
    if (CartItems) {
      const PrecosProdutosDoCarrinho = await Promise.all(
        CartItems.map(async (item) => {
          try {
            const response = await axios.get(
              `/api/products/${item.productId}`,
              { cancelToken: source.token }
            );
            const produto: ProductType = response.data;

            const variavel =
              produto &&
              produto.ProductVariable.find(
                (produto) => produto.color === item.color
              );

            return (variavel && variavel.price * item.quantity) || 0;
          } catch (error) {
            if (!axios.isCancel(error)) {
              console.error(`Fetching product ${item.productId} failed`, error);
              throw error;
            }
          }
        })
      );

      return PrecosProdutosDoCarrinho.reduce((a, b) => a! + b!, 0);
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
