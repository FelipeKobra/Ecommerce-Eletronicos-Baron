import moment from "moment";
import React from "react";

import "moment/locale/pt-br";
import GMTtoBrazil from "@/utils/Formaters/GMTtoBrazil";
import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

export default function OrderPaymentDate({
  order,
}: {
  order: OrderByIdQueryResult;
}) {
  if (order) {
    return (
      <div>
        <p>
          Data da Compra:&nbsp;
          <span className="font-semibold">{GMTtoBrazil(order.createDate)}</span>
        </p>
        <p className="opacity-70">{moment(order.createDate).fromNow()}</p>
      </div>
    );
  }
}
