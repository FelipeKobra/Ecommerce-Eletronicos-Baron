import NoData from "@/app/components/NoData";
import getProductById from "@/utils/interfaces/getPrismaItems/getProductById";

import ProductDetails from "./components/ProductDetails";
import ProductReviews from "./components/ProductReviews";


export interface ParamsProductProps {
  productId?: string;
}

export default async function page({ params }: { params: ParamsProductProps }) {
  const produto = await getProductById(params);

  if (!produto)
    return (
      <NoData
        title="Produto Não Encontrado"
        subtitle="Ache novos produtos na nossa Home!"
        link="/"
      />
    );

  return (
    <div className="flex flex-col items-center gap-[5rem]">
      <ProductDetails produto={produto} />
      <ProductReviews produto={produto} />
    </div>
  );
}
