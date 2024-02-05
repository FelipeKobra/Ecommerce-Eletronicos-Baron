"use client";

import { getStorage } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeBg, setRemoveBg] = useState(false);

  return (
    <div className="my-12">
      <AdminHeading title="Gerenciamento Dos Produtos" />
      <div className="w-full min-h-[80svh] flex flex-col justify-center items-center">
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
          processRowUpdate={async (
            updatedRow: ProductRows,
            originalRow: ProductRows
          ) => {
            handleEdit(updatedRow, router);
          }}
        />
        A
      </div>
    </div>
  );
}
