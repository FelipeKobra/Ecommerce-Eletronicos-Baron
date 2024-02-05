import { notFound } from "next/navigation";


import NoData from "@/app/components/NoData";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import getOrderById from "@/utils/interfaces/getPrismaItems/getOrderById";

import OrderDetails from "./OrderDetails";

interface IParams {
  id: string;
}

export default async function page({ params }: { params: IParams }) {
  const order = await getOrderById(params.id);
  const user = await getCurrentUser();

  const userOrder = user?.Orders.find((pedido) => pedido.id === order?.id);

  if (!userOrder || user?.role !== "ADMIN")
    return (
      <NoData
        title="Acesso não Autorizado"
        subtitle="Você não tem acesso à esse pedido!"
        link="/"
      />
    );

  if (!order) return notFound();

  return (
    <div className="flex flex-col items-center gap-[5rem]">
      <OrderDetails order={order} />
    </div>
  );
}
