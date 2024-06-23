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
    {
      field: "product_id",
      headerName: "ID",
      minWidth: 220,
      editable: true,
    },
    { field: "name", headerName: "Nome", width: 240, editable: true },
    {
      field: "category",
      headerName: "Categoria",
      minWidth: 100,
      flex: 0.5,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Marca",
      minWidth: 120,
      flex: 0.5,
      editable: true,
    },
    {
      field: "color",
      headerName: "Cor",
      minWidth: 130,
      renderCell(params) {
        return <ManageColor params={params} />;
      },
    },
    { field: "price", headerName: "Preço", minWidth: 120, editable: true },
    {
      field: "quantity",
      headerName: "Estoque",
      minWidth: 80,
      editable: true,
      renderCell: (params) => {
        return <ManageStock params={params} />;
      },
    },
    {
      field: "selling",
      headerName: "À venda",
      minWidth: 180,
      renderCell: (params) => {
        return <ManageSelling params={params} />;
      },
    },
    {
      field: "image",
      headerName: "Imagem",
      minWidth: 80,
      flex: 0.5,
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
      minWidth: 200,
      flex: 1,
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
