"use client";

import { ProductVariable } from "@prisma/client";
import { useEffect, useState } from "react";

import formatPrice from "@/utils/Formaters/formatPrice";
import { LocalStorageItem } from "@/utils/providers/LocalStorageProvider";



interface CartItemTotalPriceProps {
  variavel: ProductVariable;
  CartItems: LocalStorageItem[];
}

export default function CartItemTotalPrice({
  variavel,
  CartItems,
}: CartItemTotalPriceProps) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const productQuantity = CartItems.find(
      (item) =>
        item.productId === variavel.productId && item.color === variavel.color
    )?.quantity;

    if (productQuantity) {
      const totalPrice = productQuantity * variavel.price;
      setTotalPrice(totalPrice);
    }
  }, [CartItems, variavel.color, variavel.price, variavel.productId]);

  return (
    <div className="justify-self-end select-none">
      {formatPrice(totalPrice)}
    </div>
  );
}
