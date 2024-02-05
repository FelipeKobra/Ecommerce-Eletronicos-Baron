import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

export default async function handleStock(
  id: string,
  isSelling: boolean,
  router: AppRouterInstance
) {
  try {
    await axios.put("/api/products", {
      id,
      isSelling: !isSelling,
    });

    toast.success("Status do Produto trocado");
    router.refresh();
  } catch (error) {
    console.error(error);
  }
}
