import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

export default function checkNewProduct(produto: ProductArrayType[0]) {
  const dataHoje = new Date();
  const umaSemanaAtras = new Date();
  umaSemanaAtras.setDate(dataHoje.getDate() - 7);

  let produtoNovo = false;
  if (produto.createdDate >= umaSemanaAtras && produto.createdDate <= dataHoje)
    produtoNovo = true;

  return produtoNovo;
}
