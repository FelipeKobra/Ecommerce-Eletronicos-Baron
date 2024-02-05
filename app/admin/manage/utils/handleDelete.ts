import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

export default async function handleDelete(
  id: string,
  router: AppRouterInstance
) {
  try {
    toast("Produto sendo Deletado, aguarde!");

    await axios.delete(`/api/products/${id}`);

    toast.success("Produto Deletado");
    router.refresh();
  } catch (error) {
    console.log(error);
  }
}
