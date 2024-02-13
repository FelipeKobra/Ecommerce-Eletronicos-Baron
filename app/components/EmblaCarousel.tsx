"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";


import { ProductHighlightArrayType } from "@/utils/interfaces/getPrismaItems/getHighlightProducts";
import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

import ProductCard from "./Home/Products/ProductCard";

export default function EmblaCarousel({
  produtos,
}: {
  produtos: ProductArrayType | ProductHighlightArrayType;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(false);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) return <div className="skeleton h-[29rem] w-full my-14"></div>;

  if (produtos && produtos.length === 15)
    return (
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {produtos.map((produto) => (
              <div key={produto.id} className="embla__slide py-14">
                <ProductCard produto={produto} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="embla__prev hidden sm:block text-4xl rounded-full sm:border sm:border-base-content xl:border-0"
          onClick={scrollPrev}
        >
          <MdNavigateBefore />
        </button>
        <button
          className="embla__next hidden sm:block text-4xl rounded-full sm:border sm:border-base-content xl:border-0"
          onClick={scrollNext}
        >
          <MdNavigateNext />
        </button>
      </div>
    );
}
