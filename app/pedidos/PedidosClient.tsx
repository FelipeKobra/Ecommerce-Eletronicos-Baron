"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import CustomDataGrid from "@/app/components/CustomGridData";
import { OrdersByUserIdType } from "@/utils/interfaces/getPrismaItems/getOrdersByUserId";

import getPedidosColumns from "./data/getPedidosColumns";
import getPedidosRows from "./data/getPedidosRows";

import "moment/locale/pt-br";
import NoData from "../components/NoData";

export default function PedidosClient({
  orders,
}: {
  orders: OrdersByUserIdType;
}) {
  const router = useRouter();
  console.log

  const MOBILE_COLUMNS = useMemo(() => {
    return {
      id: false,
      order_id: false,
      client: false,
      paymentStatus: true,
      amount: true,
      date: false,
      deliveryStatus: true,
    };
  }, []);

  const ALL_COLUMNS = useMemo(() => {
    return {
      id: true,
      order_id: true,
      client: true,
      paymentStatus: true,
      amount: true,
      date: true,
      deliveryStatus: true,
    };
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);

  useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [ALL_COLUMNS, MOBILE_COLUMNS, matches]);

  return (
    <div className="mt-10 mb-3 w-full flex flex-col items-center gap-4">
      {(!orders || orders.length === 0) && (
        <NoData
          title="Você não possui pedidos"
          subtitle="Mas não tem problema, sempre há uma primeira vez!"
          link="/"
        />
      )}
      {orders && orders.length > 0 && (
        <>
          <div className="text-4xl mt-8 font-semibold text-center">
            <h1>Pedidos</h1>
          </div>
          <div className="w-full md:w-11/12 lg:w-10/12 h-[100svh] overflow-auto ">
            <CustomDataGrid
              rows={getPedidosRows(orders)}
              columns={getPedidosColumns({ router })}
              columnVisibilityModel={columnVisible}
            />
          </div>
        </>
      )}
    </div>
  );
}
