import { OrderItem } from "@prisma/client";

import { getProductById } from "@/utils/interfaces/getPrismaItems/getProductById";

export default async function updateProductDetails(items: OrderItem[]) {
  for (const item of items) {
    const produto = await getProductById(item.productId);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    const variavel = produto.ProductVariable.find(
      (produto) =>
        produto.productId === item.productId && produto.color === item.color
    );

    if (!variavel) {
      throw new Error("Produto não encontrado");
    }

    if (item.quantity > variavel.stock) {
      throw new Error(
        `Quantidade de Produtos acima do permitido no item: ${produto.name}`
      );
    }

    item.name = produto.name;
    item.price = variavel.price;
    item.image = variavel.image;
  }
}
