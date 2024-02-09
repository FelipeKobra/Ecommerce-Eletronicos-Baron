import React from "react";

export default function ManageSelling({ params }: { params: any }) {
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
