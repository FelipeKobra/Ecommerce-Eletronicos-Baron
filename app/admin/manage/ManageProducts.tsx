"use client";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getStorage } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";


import CustomDataGrid from "@/app/components/CustomGridData";
import firebaseApp from "@/libs/firebase";
import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

import getManageColumns from "./components/getManageColumns/getManageColumns";
import getManageRows from "./data/getManageRows";
import ProductRows from "./types/ProductRows";
import handleDelete from "./utils/handleDelete";
import handleEdit from "./utils/handleEdit";
import handleImage from "./utils/handleImage";
import handleStock from "./utils/handleStock";

import AdminHeading from "../components/AdminHeading";

export default function ManageProducts({
  products,
}: {
  products: ProductArrayType;
}) {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  const MOBILE_COLUMNS = useMemo(() => {
    return {
      id: false,
      product_id: false,
      variable_id: false,
      name: true,
      category: false,
      brand: false,
      color: true,
      colorCode: true,
      price: true,
      quantity: true,
      image: false,
      imagePath: false,
      selling: true,
    };
  }, []);

  const ALL_COLUMNS = useMemo(() => {
    return {
      id: true,
      product_id: true,
      variable_id: true,
      name: true,
      category: true,
      brand: true,
      color: true,
      colorCode: true,
      price: true,
      quantity: true,
      image: true,
      imagePath: true,
      selling: true,
    };
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);

  useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [ALL_COLUMNS, MOBILE_COLUMNS, matches]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeBg, setRemoveBg] = useState(false);

  return (
    <div className="my-12 flex flex-col items-center overflow-auto">
      <AdminHeading title="Gerenciamento Dos Produtos" />
      <div className="w-full md:w-11/12 mt-4 h-[100svh] max-w-[100%] ">
        <CustomDataGrid
          rows={getManageRows(products)}
          columns={getManageColumns({
            router,
            storage,
            imageFile,
            removeBg,
            setRemoveBg,
            setImageFile,
            handleDelete,
            handleStock,
            handleImage,
          })}
          processRowUpdate={ (
            updatedRow: ProductRows,
            originalRow: ProductRows
          ) => {
      
            handleEdit(updatedRow, router);
          }}
          columnVisibilityModel={columnVisible}
        />
      </div>
    </div>
  );
}
