import { GridColDef } from "@mui/x-data-grid";

import ManageAction from "./components/ManageAction";
import ManageColor from "./components/ManageColor";
import ManageImage from "./components/ManageImage";
import ManageSelling from "./components/ManageSelling";
import ManageStock from "./components/ManageStock";
import { getManageColumnsProps } from "./types/getManageColumnsProps";

export default function getManageColumns({
  router,
  storage,
  imageFile,
  removeBg,
  setRemoveBg,
  setImageFile,
  handleDelete,
  handleStock,
  handleImage,
}: getManageColumnsProps) {
  const columns: GridColDef[] = [
    { field: "product_id", headerName: "ID", width: 230, editable: true },
    { field: "name", headerName: "Nome", width: 180 },
    { field: "category", headerName: "Categoria", width: 110, editable: true },
    { field: "brand", headerName: "Marca", width: 110, editable: true },
    {
      field: "color",
      headerName: "Cor",
      width: 140,
      renderCell(params) {
        return <ManageColor params={params} />;
      },
    },
    { field: "price", headerName: "Preço", width: 140, editable: true },
    {
      field: "quantity",
      headerName: "Estoque",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <ManageStock params={params} />;
      },
    },
    {
      field: "selling",
      headerName: "À venda",
      width: 180,
      renderCell: (params) => {
        return <ManageSelling params={params} />;
      },
    },
    {
      field: "image",
      headerName: "Imagem",
      width: 100,
      renderCell(params) {
        return (
          <ManageImage
            router={router}
            storage={storage}
            params={params}
            handleImage={handleImage}
            imageFile={imageFile}
            removeBg={removeBg}
            setImageFile={setImageFile}
            setRemoveBg={setRemoveBg}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Acões",
      width: 200,
      renderCell: (params) => {
        return (
          <ManageAction
            router={router}
            params={params}
            handleStock={handleStock}
            handleDelete={handleDelete}
          />
        );
      },
    },
  ];

  return columns;
}
