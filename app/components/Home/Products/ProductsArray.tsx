import ProductCard from "./ProductCard";

import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

interface ProductsArrayProps {
  produtos: ProductArrayType;
}

export default function ProductsArray({ produtos }: ProductsArrayProps) {
  return (
    <div className="w-11/12  my-8 grid grid-cols-5 justify-start items-center">
      {produtos.map((product) => {
        return <ProductCard key={product.id} produto={product} />;
      })}
    </div>
  );
}
