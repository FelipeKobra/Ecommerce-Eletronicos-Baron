"use client";

import { useEffect, useState } from "react";

import formatPrice from "@/utils/Formaters/formatPrice";
import { AcharPrecoTotalCarrinho } from "@/utils/interfaces/getPrismaItems/getProductsFromCart";
import { LocalStorageItem } from "@/utils/providers/LocalStorageProvider";

interface CheckoutPriceProps {
  CartItems: LocalStorageItem[] | null;
}

export default function CheckoutPrice({ CartItems }: CheckoutPriceProps) {
  const [precoTotal, setPrecoTotal] = useState(0);

  useEffect(() => {
    (async function handleTotalPrice() {
      if (CartItems) {
        try {
          const totalPrice = await AcharPrecoTotalCarrinho({ CartItems });
          totalPrice && setPrecoTotal(totalPrice);
        } catch (error: any) {
          throw new Error(error);
        }
      }
    })();
  }, [CartItems]);

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold pt-10">
        Total: {formatPrice(precoTotal)}
      </h3>
    </div>
  );
}
