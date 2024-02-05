import React from "react";


import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import getOrders from "@/utils/interfaces/getPrismaItems/getOrders";

import ManageOrders from "./ManageOrders";

export default async function page() {
  const orders = await getOrders();
  const user = await getCurrentUser();

  return (
    <div className="w-full h-full">
      <ManageOrders orders={orders} />
    </div>
  );
}
