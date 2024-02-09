import React from "react";

import formatPrice from "@/utils/Formaters/formatPrice";
import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

export default function OrderHeaders({
  order,
}: {
  order: OrderByIdQueryResult;
}) {
  if (order) {
    return (
      <>
        <div className="text-4xl">
          <h1> Detalhes do Pedido</h1>
        </div>
        <div>
          <h2>{`ID do Pedido: ${order.id}`}</h2>
        </div>
        <div>
          <p>
            Preço Total:&nbsp;
            <span className="font-semibold">{formatPrice(order.amount)}</span>
          </p>
        </div>
      </>
    );
  }
}
