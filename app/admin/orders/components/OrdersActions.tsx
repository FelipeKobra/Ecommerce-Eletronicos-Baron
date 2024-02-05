import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { DeliveryStatus } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  MdPause,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

import ActionBtn from "../../manage/components/ActionBtn";

interface OrdersActionsProps {
  router: AppRouterInstance;
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  handleDeliveryStatus(
    id: string,
    router: AppRouterInstance,
    deliveryStatus: string
  ): Promise<void>;
}

export default function OrdersActions({
  router,
  params,
  handleDeliveryStatus,
}: OrdersActionsProps) {
  return (
    <div className="flex justify-around gap-4 w-full">
      <ActionBtn
        icon={MdPause}
        onClick={() => {
          handleDeliveryStatus(
            params.row.order_id,
            router,
            DeliveryStatus.Pendente
          );
        }}
      />
      <ActionBtn
        icon={MdDeliveryDining}
        onClick={() => {
          handleDeliveryStatus(
            params.row.order_id,
            router,
            DeliveryStatus.Caminho
          );
        }}
      />
      <ActionBtn
        icon={MdDone}
        onClick={() => {
          handleDeliveryStatus(
            params.row.order_id,
            router,
            DeliveryStatus.Entregue
          );
        }}
      />
      <ActionBtn
        icon={MdRemoveRedEye}
        onClick={() => {
          router.push(`/order/${params.row.order_id}`);
        }}
      />
    </div>
  );
}
