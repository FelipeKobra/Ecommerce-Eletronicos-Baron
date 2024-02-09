"use client";
import { useEffect, useState } from "react";

import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

import ProductCard from "./ProductCard";


interface ProductsArrayProps {
  produtos: ProductArrayType;
}

export default function ProductsArray({ produtos }: ProductsArrayProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="skeleton w-full h-[29rem] my-14"></div>;

  return (
    <div className="w-full  my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-start items-center">
      {produtos.map((product) => {
        return <ProductCard key={product.id} produto={product} />;
      })}
    </div>
  );
}
