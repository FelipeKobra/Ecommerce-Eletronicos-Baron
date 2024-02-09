import { GridColDef } from "@mui/x-data-grid";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import OrdersActions from "./OrdersActions";
import OrdersDeliveryStatus from "./OrdersDeliveryStatus";
import OrdersPaymentStatus from "./OrdersPaymentStatus";

interface getOrdersColumnsProps {
  router: AppRouterInstance;
  handleDeliveryStatus(
    id: string,
    router: AppRouterInstance,
    deliveryStatus: string
  ): Promise<void>;
}

export default function getOrdersColumns({
  router,
  handleDeliveryStatus,
}: getOrdersColumnsProps) {
  const columns: GridColDef[] = [
    { field: "order_id", headerName: "ID", width: 200 },
    { field: "client", headerName: "Cliente", minWidth: 120 },
    { field: "amount", headerName: "Total", minWidth: 130 },
    {
      field: "paymentStatus",
      headerName: "Status do Pagamento",
      width: 180,
      renderCell: (params) => {
        return <OrdersPaymentStatus params={params} />;
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Status da Entrega",
      width: 180,
      renderCell: (params) => {
        return <OrdersDeliveryStatus params={params} />;
      },
    },
    {
      field: "date",
      headerName: "Data do Pedido",
      width: 140,
    },
    {
      field: "action",
      headerName: "Acões",
      width: 280,
      renderCell: (params) => {
        return (
          <OrdersActions
            params={params}
            router={router}
            handleDeliveryStatus={handleDeliveryStatus}
          />
        );
      },
    },
  ];

  return columns;
}
