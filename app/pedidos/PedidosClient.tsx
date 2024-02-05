"use client";

import { GridColDef } from "@mui/x-data-grid";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdRemoveRedEye } from "react-icons/md";

import ActionBtn from "@/app/admin/manage/components/ActionBtn";
import CustomDataGrid from "@/app/components/CustomGridData";
import { PascalName } from "@/utils/Formaters/formatName";
import formatPrice from "@/utils/Formaters/formatPrice";
import GMTtoBrazil from "@/utils/Formaters/GMTtoBrazil";
import { OrdersByUserIdType } from "@/utils/interfaces/getPrismaItems/getOrdersByUserId";

import "moment/locale/pt-br";

export default function PedidosClient({
  orders,
}: {
  orders: OrdersByUserIdType;
}) {
  const router = useRouter();

  let rows: any = [];

  for (const order of orders!) {
    rows.push({
      id: `${order.id}-${order.userId}`,
      order_id: order.id,
      client: order.user.name,
      paymentStatus: order.status,
      amount: formatPrice(order.amount),
      date: GMTtoBrazil(order.createDate),
      deliveryStatus: order.deliveryStatus,
    });
  }

  const columns: GridColDef[] = [
    { field: "order_id", headerName: "ID", width: 250 },
    { field: "client", headerName: "Cliente", width: 160 },
    { field: "amount", headerName: "Total", width: 140 },
    {
      field: "paymentStatus",
      headerName: "Status do Pagamento",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className={`font-bold w-full py-1 rounded ${
              params.row.paymentStatus === PaymentStatus.Pendente
                ? "bg-rose-200 text-rose-700"
                : "bg-teal-200 text-teal-700"
            }`}
          >
            {PascalName(params.row.paymentStatus)}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Status da Entrega",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className={`font-bold w-full py-1 rounded bg-rose-200 text-rose-700 ${
              params.row.deliveryStatus === DeliveryStatus.Entregue &&
              "bg-teal-200 text-teal-700"
            }

                ${
                  params.row.deliveryStatus === DeliveryStatus.Caminho &&
                  "bg-yellow-200 text-yellow-700"
                }
            }`}
          >
            {PascalName(params.row.deliveryStatus)}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Data do Pedido",
      width: 150,
    },
    {
      field: "action",
      headerName: "Acões",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-start gap-4 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.order_id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="my-12 mx-auto">
      <div className="text-4xl mt-8 font-semibold text-center">
        <h1>Pedidos</h1>
      </div>
      <div className="w-full min-h-[80svh] flex flex-col justify-center items-center">
        <CustomDataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
