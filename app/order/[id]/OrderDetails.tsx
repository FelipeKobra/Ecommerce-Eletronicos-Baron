"use client";

import "moment/locale/pt-br";

import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

import OrderHeaders from "./components/OrderHeaders";
import OrderOrders from "./components/OrderOrders";
import OrderPaymentStatus from "./components/OrderPaymentStatus";
import OrderDeliveryStatus from "./components/OrderDeliveryStatus";



export default function OrderDetails({
  order,
}: {
  order: OrderByIdQueryResult;
}) {
  if (order)
    return (
      <div className="w-11/12 m-10 flex flex-col gap-6 text-lg">
        <OrderHeaders order={order} />
        <OrderPaymentStatus order={order} />
        <OrderDeliveryStatus order={order} />
        <OrderOrders order={order} />
      </div>
    );
}
