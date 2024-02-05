import getProducts, {
  ProductArrayType,
  getProductsProps,
} from "@/utils/interfaces/getPrismaItems/getProducts";

import Banner from "./components/Home/Banner/Banner";
import ProductsArray from "./components/Home/Products/ProductsArray";
import NoData from "./components/NoData";


interface HomeProps {
  searchParams: getProductsProps;
}

export default async function Home({ searchParams }: HomeProps) {
  const produtos = await getProducts(searchParams);

  if (!produtos || produtos.length <= 0) {
    return (
      <NoData
        title="Nenhum produto encontrado"
        subtitle="Não tem problema, tem muito mais!"
        link="/"
      />
    );
  }

  function embaralhar(produtos: ProductArrayType) {
    for (let i = produtos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = produtos[i];
      produtos[i] = produtos[j];
      produtos[j] = temp;
    }
    return produtos;
  }

  const produtosEmbaralhados = embaralhar(produtos);

  return (
    <div className="flex flex-wrap  justify-center items-center">
      <div className="w-full justify-center items-center ">
        <Banner />
      </div>

      <div className="w-full justify-center items-center flex flex-wrap">
        <ProductsArray produtos={produtosEmbaralhados} />
      </div>
    </div>
  );
}
