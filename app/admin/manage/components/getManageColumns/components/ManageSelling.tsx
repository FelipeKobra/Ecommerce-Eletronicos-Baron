import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React from "react";

export default function ManageSelling({
  params,
}: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}) {
  return (
    <div
      className={`font-semibold w-full py-1 rounded ${
        params.row.selling
          ? "bg-teal-200 text-teal-700"
          : "bg-rose-200 text-rose-700"
      }`}
    >
      {params.row.selling ? "À Venda ✅" : "Fora das Vendas ⭕"}
    </div>
  );
}
