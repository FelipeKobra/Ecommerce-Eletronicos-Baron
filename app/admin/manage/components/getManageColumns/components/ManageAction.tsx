import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";

import ActionBtn from "../../ActionBtn";

interface ManageActionProps {
  router: AppRouterInstance;
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  handleStock(
    id: string,
    isSelling: boolean,
    router: AppRouterInstance
  ): Promise<void>;
  handleDelete(id: string, router: AppRouterInstance): Promise<void>;
}

export default function ManageAction({
  router,
  params,
  handleStock,
  handleDelete,
}: ManageActionProps) {
  return (
    <div className="flex justify-between gap-4 w-full">
      <ActionBtn
        icon={MdCached}
        onClick={() => {
          handleStock(params.row.product_id, params.row.selling, router);
        }}
      />
      <ActionBtn
        icon={MdDelete}
        onClick={() => {
          handleDelete(params.row.product_id, router);
        }}
      />
      <ActionBtn
        icon={MdRemoveRedEye}
        onClick={() => {
          router.push(`/produto/${params.row.product_id}`);
        }}
      />
    </div>
  );
}
