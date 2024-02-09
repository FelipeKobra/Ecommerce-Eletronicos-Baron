import { GridColDef } from "@mui/x-data-grid";
import { PaymentStatus, DeliveryStatus } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MdRemoveRedEye } from "react-icons/md";

import ActionBtn from "@/app/admin/manage/components/ActionBtn";
import { PascalName } from "@/utils/Formaters/formatName";

interface getPedidosColumnsProps {
  router: AppRouterInstance;
}

export default function getPedidosColumns({ router }: getPedidosColumnsProps) {
  const columns: GridColDef[] = [
    { field: "order_id", headerName: "ID", minWidth: 0, flex: 1 },
    { field: "client", headerName: "Cliente", minWidth: 0, flex:0.5 },
    { field: "amount", headerName: "Total", minWidth: 120, flex:0.5 },
    {
      field: "paymentStatus",
      headerName: "Status do Pagamento",
      minWidth: 120,
      flex: 1,
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
      minWidth: 120,
      flex: 1,
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
      minWidth: 40,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Acões",
      minWidth:60,
      flex:0.5,
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

  return columns;
}
