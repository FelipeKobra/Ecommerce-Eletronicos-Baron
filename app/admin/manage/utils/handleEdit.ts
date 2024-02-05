import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

import ProductRows from "../types/ProductRows";

export default async function handleEdit(
  data: ProductRows,
  router: AppRouterInstance
) {
  if (typeof data.price === "string") {
    const stringPrice = data.price
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".");
    data.price = parseInt(stringPrice);
  }

  if (typeof data.quantity === "string") {
    data.quantity = parseInt(data.quantity);
  }

  try {
    toast("Produto sendo Alterado, aguarde!");

    const newRow = await axios.post("/api/products/edit", data);

    toast.success("Produto Alterado");
    router.refresh();
    return newRow;
  } catch (error: any) {
    throw new Error(error);
  }
}
