import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

export default async function handleDeliveryStatus(
  id: string,
  router: AppRouterInstance,
  deliveryStatus: string
) {
  try {
    await axios.put("/api/order", {
      id,
      deliveryStatus: deliveryStatus,
    });

    toast.success("Status do Produto trocado");
    router.refresh();
  } catch (error) {
    console.error(error);
  }
}
