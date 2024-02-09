import React from "react";

import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

export default function OrderDeliveryStatus({
  order,
}: {
  order: OrderByIdQueryResult;
}) {
  if (order) {
    return (
      <div className="flex flex-col gap-2">
        <div>Status da Entrega:</div>
        <div className="text-center">
          {order.deliveryStatus === "Pendente" ? (
            <div className="rounded-md w-[6rem]  bg-rose-200 text-rose-700">
              Pendente
            </div>
          ) : order.deliveryStatus === "Entregue" ? (
            <div className="rounded-md w-[7rem] bg-teal-200 text-teal-700">
              Entregue
            </div>
          ) : (
            order.deliveryStatus === "Caminho" && (
              <div className="rounded-md w-[7rem] bg-yellow-200 text-yellow-700">
                À Caminho
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
