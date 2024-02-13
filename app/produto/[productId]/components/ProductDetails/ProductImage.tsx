"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductImage {
  imagens: string[];
  imageIndex: number;
  name: string;
}

export default function ProductImage({
  imagens,
  imageIndex,
  name,
}: ProductImage) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className=" relative col-span-2 lg:col-span-1 flex justify-center w-10/12 h-full max-h-[40rem] justify-self-center self-start  items-center  bg-white rounded-lg">
      <div>
        {isLoading && (
          <span className="loading loading-spinner loading-md absolute right-10 top-10"></span>
        )}

        <Image
          className="max-h-[30rem] py-10 lg:py-0"
          src={imagens[imageIndex]}
          alt={name}
          width={250}
          height={250}
          quality={100}
          priority={true}
          onLoad={(e) => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
