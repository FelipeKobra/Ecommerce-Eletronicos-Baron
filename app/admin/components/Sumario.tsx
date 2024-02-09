"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";



import { formatNumber } from "@/utils/Formaters/formatNumber";
import formatPrice from "@/utils/Formaters/formatPrice";
import { OrdersQueryResult } from "@/utils/interfaces/getPrismaItems/getOrders";
import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

import AdminHeading from "./AdminHeading";


interface SumarioProps {
  pedidos: OrdersQueryResult;
  produtos: ProductArrayType;
  users: User[];
}

interface SummaryDataType {
  [key: string]: {
    label: string;
    digit: number;
  };
}

export default function Sumario({ pedidos, produtos, users }: SumarioProps) {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    vendas: {
      label: "Vendas Totais",
      digit: 0,
    },
    produtos: {
      label: "Produtos Totais",
      digit: 0,
    },
    pedidos: {
      label: "Pedidos Totais",
      digit: 0,
    },
    pedidosPagos: {
      label: "Pedidos Pagos Totais",
      digit: 0,
    },
    pedidosPendentes: {
      label: "Pedidos Pendentes Totais",
      digit: 0,
    },
    users: {
      label: "Usuários Totais",
      digit: 0,
    },
  });

  useEffect(() => {
    if (pedidos) {
      setSummaryData((prev) => {
        let tempData = { ...prev };

        const vendasTotais = pedidos.reduce((acc, act) => {
          if (act.status === "Realizado") {
            return acc + act.amount;
          } else {
            return acc;
          }
        }, 0);

        const pedidosPagos = pedidos.filter(
          (pedido) => pedido.status === "Realizado"
        );

        const pedidosPendentes = pedidos.filter(
          (pedido) => pedido.status === "Pendente"
        );

        tempData.vendas.digit = vendasTotais;
        tempData.pedidos.digit = pedidos.length;
        tempData.pedidosPagos.digit = pedidosPagos.length;
        tempData.pedidosPendentes.digit = pedidosPendentes.length;
        tempData.produtos.digit = produtos.length;
        tempData.users.digit = users.length;

        return tempData;
      });
    }
  }, [pedidos, produtos, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="w-full">
      <AdminHeading title="Estatísticas" />

      <div className="my-6 grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            const { digit, label } = summaryData[key];
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className=" text-xl md:text-4xl font-bold">
                  {key === "vendas" ? (
                    <>{formatPrice(digit)}</>
                  ) : (
                    <>{formatNumber(digit)}</>
                  )}
                </div>
                <p className="text-center md:text-start">{label}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
