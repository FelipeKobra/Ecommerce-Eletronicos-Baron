import { OrderItem } from "@prisma/client";
import React from "react";

import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

import OrderProduct from "../OrderProduct";

export default function OrderOrders({
  order,
}: {
  order: OrderByIdQueryResult;
}) {
  if (order) {
    return (
      <div>
        <h3 className="text-2xl font-medium">PEDIDO</h3>
        <div className="hidden md:grid grid-cols-5 text-lg gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUTO</div>
          <div className="justify-self-center">PREÇO</div>
          <div className="justify-self-center">QUANTIDADE</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item: OrderItem) => {
            return <OrderProduct key={item.id} item={item} />;
          })}
      </div>
    );
  }
}
