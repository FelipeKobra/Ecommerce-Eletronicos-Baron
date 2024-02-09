"use client";

import "moment/locale/pt-br";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import CustomDataGrid from "@/app/components/CustomGridData";
import { OrdersQueryResult } from "@/utils/interfaces/getPrismaItems/getOrders";

import getOrdersColumns from "./components/getOrdersColumns";
import getOrdersRows from "./data/getOrdersRows";
import handleDeliveryStatus from "./utils/handleDeliveryStatus";

import AdminHeading from "../components/AdminHeading";

export default function ManageOrders({
  orders,
}: {
  orders: OrdersQueryResult;
}) {
  const router = useRouter();

  const MOBILE_COLUMNS = useMemo(() => {
    return {
      id: false,
      order_id: false,
      client: true,
      paymentStatus: true,
      amount: true,
      date: true,
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
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);

  useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [ALL_COLUMNS, MOBILE_COLUMNS, matches]);

  return (
    <div className="my-12 flex flex-col items-center">
      <AdminHeading title="Gerenciamento dos Pedidos" />
      <div className="w-11/12 h-[100svh] flex flex-col justify-center items-center">
        <CustomDataGrid
          rows={getOrdersRows(orders)}
          columns={getOrdersColumns({ router, handleDeliveryStatus })}
          columnVisibilityModel={columnVisible}
        />
      </div>
    </div>
  );
}
