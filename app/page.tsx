import { MdBolt, MdCheckCircle, MdShoppingBasket } from "react-icons/md";

import { getHighlightProducts } from "@/utils/interfaces/getPrismaItems/getHighlightProducts";
import getProducts, {
  ProductArrayType,
  getProductsProps,
} from "@/utils/interfaces/getPrismaItems/getProducts";

import Banner from "./components/Home/Banner/Banner";
import ProductsArray from "./components/Home/Products/ProductsArray";
import NoData from "./components/NoData";
import SwiperCarousel from "./components/SwiperCarousel";

interface HomeProps {
  searchParams: getProductsProps;
}

export default async function page({ searchParams }: HomeProps) {
  let take: undefined | number = undefined;
  if (Object.keys(searchParams).length <= 0) take = 15;
  let produtos, lancamentos, destaques;

  if (!Object.keys(searchParams).length) {
    [produtos, lancamentos, destaques] = await Promise.all([
      getProducts({ ...searchParams, take: take, selling: true }),
      getProducts({
        ...searchParams,
        take: 15,
        dateOrder: "desc",
        selling: true,
      }),
      getHighlightProducts(),
    ]);
  }

  if (Object.keys(searchParams).length > 0) {
    produtos = await getProducts({
      ...searchParams,
      take: take,
      selling: true,
    });
  }

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
    <div className="flex  flex-col gap-5 justify-center items-center">
      {!Object.keys(searchParams).length &&
        lancamentos !== undefined &&
        destaques !== undefined && (
          <>
            <div className="w-full justify-center items-center ">
              <Banner />
            </div>

            <div className="w-11/12 relative flex flex-col">
              <div className="flex gap-1 absolute top-0 left-0 text-3xl">
                <MdBolt className="text-primary" />
                <p>LANÇAMENTOS</p>
              </div>

              <SwiperCarousel produtos={lancamentos} />
            </div>

            <div className="w-11/12 relative flex flex-col ">
              <div className="flex gap-1 absolute top-0 left-0 text-3xl">
                <MdShoppingBasket className="text-primary" />
                <p>MAIS VENDIDOS</p>
              </div>

              <SwiperCarousel produtos={destaques} />
            </div>
          </>
        )}

      <div className="w-11/12 relative justify-center items-center flex flex-col">
        {!Object.keys(searchParams).length && (
          <div className="flex  gap-1 absolute top-0 left-0 text-2xl sm:text-3xl">
            <MdCheckCircle className="text-primary" />
            <p>MELHORES DO MERCADO</p>
          </div>
        )}

        <ProductsArray produtos={produtosEmbaralhados} />
      </div>
    </div>
  );
}
