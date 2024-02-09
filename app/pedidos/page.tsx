import React from "react";

import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import getOrdersByUserId from "@/utils/interfaces/getPrismaItems/getOrdersByUserId";

import PedidoClient from "./PedidosClient";

import NoData from "../components/NoData";

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <NoData
        title="Acesso Negado"
        subtitle="Entre em sua conta para ver seus pedidos"
        link="/login"
      />
    );
  }

  const orders = await getOrdersByUserId(user.id);
  console.log(user.id)
  console.log(orders)

  return (
    <div className="w-full h-full mx-auto ">
      <PedidoClient orders={orders} />
    </div>
  );
}
