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
    <div className="grid grid-cols-5 text-md gap-4 border-t[1.5px] border-base-content py-4 items-center ">
      <div className="col-span-2 justify-self-start flex gap-2 ">
        <div className="relative w-[70px] aspect-square">
          <Link href={`/produto/${item.productId}`}>
            <Image
              src={item.image}
              alt="Imagem do Produto"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <div>
          <p>{truncateNames(item.name)}</p>
          <p>{item.color} </p>
        </div>
      </div>
      <div className="justify-self-center"> {formatPrice(item.price)}</div>
      <div className="justify-self-center"> {item.quantity}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}
