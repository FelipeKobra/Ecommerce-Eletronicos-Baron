import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { DeliveryStatus } from "@prisma/client";
import React from "react";

import { PascalName } from "@/utils/Formaters/formatName";

export default function OrdersDeliveryStatus({
  params,
}: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}) {
  return (
    <div
      className={`font-bold w-full py-1 rounded bg-rose-200 text-rose-700 ${
        params.row.deliveryStatus === DeliveryStatus.Entregue &&
        "bg-teal-200 text-teal-700"
      }

            ${
              params.row.deliveryStatus === DeliveryStatus.Caminho &&
              "bg-yellow-200 text-yellow-700"
            }
        }`}
    >
      {PascalName(params.row.deliveryStatus)}
    </div>
  );
}
