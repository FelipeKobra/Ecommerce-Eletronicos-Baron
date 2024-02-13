import Image from "next/image";

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
  return (
    <div className=" col-span-2 lg:col-span-1 flex justify-center w-10/12 h-full max-h-[40rem] justify-self-center self-start  items-center  bg-white rounded-lg">
      <div>
        <Image
          className="max-h-[30rem] py-10 lg:py-0"
          src={imagens[imageIndex]}
          alt={name}
          sizes=""
          width={250}
          height={250}
          quality={100}
          loading="eager"
        />
      </div>
    </div>
  );
}
