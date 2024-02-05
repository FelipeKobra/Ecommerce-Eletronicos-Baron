import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React from "react";

export default function ManageStock({
  params,
}: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}) {
  return (
    <div
      className={`font-bold w-full py-1 rounded ${
        params.row.quantity > 0
          ? params.row.quantity < 50
            ? "bg-yellow-200 text-yellow-700"
            : "bg-teal-200 text-teal-700"
          : "bg-rose-200 text-rose-700"
      }`}
    >
      {params.row.quantity} Un
    </div>
  );
}
