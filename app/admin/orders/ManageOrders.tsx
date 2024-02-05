"use client";

import "moment/locale/pt-br";

import { useRouter } from "next/navigation";

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

  return (
    <div className="my-12 ">
      <AdminHeading title="Gerenciamento dos Pedidos" />
      <div className="w-full min-h-[80svh] flex flex-col justify-center items-center">
        <CustomDataGrid
          rows={getOrdersRows(orders)}
          columns={getOrdersColumns({ router, handleDeliveryStatus })}
        />
        A
      </div>
    </div>
  );
}
