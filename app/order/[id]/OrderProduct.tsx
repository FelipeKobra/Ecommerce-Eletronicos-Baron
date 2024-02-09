import { OrderItem } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import truncateNames from "@/utils/Formaters/formatName";
import formatPrice from "@/utils/Formaters/formatPrice";

interface OrderItemProps {
  item: OrderItem;
}

export default function OrderProduct({ item }: OrderItemProps) {
  return (
    <div className="grid md:grid-rows-1 md:grid-cols-5 my-4 md:my-0 rounded-lg border-2 md:border-0 text-2xl md:text-md gap-4 border-t[1.5px] border-base-content py-4 items-center ">


      <div className="col-span-2 justify-self-center md:justify-self-start flex flex-col md:flex-row gap-2 ">
        <div className="relative md:w-[70px] self-center aspect-square rounded-md bg-white px-10">
          <Link className="px-4" href={`/produto/${item.productId}`}>
            <Image
              src={item.image}
              alt="Imagem do Produto"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <div className="text-center md:text-start justify-self-center md:justify-self-start">
          <p className="px-4">{truncateNames(item.name)}</p>
          <p>{item.color} </p>
        </div>
      </div>



      <div className="col-span-2 md:col-span-1 justify-self-center"> {formatPrice(item.price)}</div>
      <div className="col-span-2 md:col-span-1 justify-self-center"> {item.quantity}</div>
      <div className="col-span-2 md:col-span-1 justify-self-center md:justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}
