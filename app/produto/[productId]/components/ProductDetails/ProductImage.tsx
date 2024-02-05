import Image from "next/image"

interface ProductImage {
    imagens:string[],
    imageIndex:number,
    name:string,
}

export default function ProductImage({imagens,imageIndex,name}:ProductImage) {
  return (
    <Image
    className="my-auto duration-500 hover:scale-110"
    src={imagens[imageIndex]}
    alt={name}
    width={400}
    height={400}
  />
  )
}
