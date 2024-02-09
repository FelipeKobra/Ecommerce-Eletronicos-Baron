import React from "react";

import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

export default function OrderPaymentStatus({order}:{order: OrderByIdQueryResult}) {
  if (order) {
    return (
      <div className="flex flex-col gap-2">
        <h3>Status do Pagamento:</h3>
        <div className="text-center">
          {order.status === "Pendente" ? (
            <div className="rounded-md w-[6rem]  bg-rose-200 text-rose-700">
              Pendente
            </div>
          ) : (
            order.status === "Realizado" && (
              <div className="rounded-md w-[7rem] bg-teal-200 text-teal-700">
                Realizado
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
