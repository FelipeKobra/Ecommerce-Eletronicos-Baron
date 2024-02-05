"use client";

import { OrderItem } from "@prisma/client";
import moment from "moment";

import "moment/locale/pt-br";

import formatPrice from "@/utils/Formaters/formatPrice";
import GMTtoBrazil from "@/utils/Formaters/GMTtoBrazil";
import { OrderByIdQueryResult } from "@/utils/interfaces/getPrismaItems/getOrderById";

import OrderProduct from "./OrderProduct";

export default function OrderDetails({
  order,
}: {
  order: OrderByIdQueryResult;
}) {
  if (order)
    return (
      <div className="w-11/12 m-10 flex flex-col gap-6 text-lg">
        <div className="text-4xl">
          <h1> Detalhes do Pedido</h1>
        </div>
        <div>
          <h2>ID do Pedido: {order.id}</h2>
        </div>
        <div>
          <p>
            Preço Total:{" "}
            <span className="font-semibold">{formatPrice(order.amount)}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3>Status do Pagamento:</h3>
          <div className="text-center">
            {order.status === "Pendente" ? (
              <div className="rounded-md w-[6rem]  bg-rose-200 text-rose-700">
                Pendente
              </div>
            ) : (
              order.status === "Realizado" && (
                <div className="rounded-md w-[7rem] bg-teal-200 text-teal-700">
                  Realizado
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Status da Entrega:</div>
          <div className="text-center">
            {order.deliveryStatus === "Pendente" ? (
              <div className="rounded-md w-[6rem]  bg-rose-200 text-rose-700">
                Pendente
              </div>
            ) : order.deliveryStatus === "Entregue" ? (
              <div className="rounded-md w-[7rem] bg-teal-200 text-teal-700">
                Entregue
              </div>
            ) : (
              order.deliveryStatus === "Caminho" && (
                <div className="rounded-md w-[7rem] bg-yellow-200 text-yellow-700">
                  À Caminho
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <p>
            Data da Compra:&nbsp;
            <span className="font-semibold">
              {GMTtoBrazil(order.createDate)}
            </span>
          </p>
          <p className="opacity-70">{moment(order.createDate).fromNow()}</p>
        </div>

        <div>
          <h3 className="text-2xl font-medium">PEDIDO</h3>
          <div className="grid grid-cols-5 text-lg gap-4 pb-2 items-center">
            <div className="col-span-2 justify-self-start">PRODUTO</div>
            <div className="justify-self-center">PREÇO</div>
            <div className="justify-self-center">QUANTIDADE</div>
            <div className="justify-self-end">TOTAL</div>
          </div>
          {order.products &&
            order.products.map((item: OrderItem) => {
              return <OrderProduct key={item.id} item={item} />;
            })}
        </div>
      </div>
    );
}
