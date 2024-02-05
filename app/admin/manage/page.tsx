
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import getProducts from "@/utils/interfaces/getPrismaItems/getProducts";

import ManageProducts from "./ManageProducts";



export default async function page() {
  const products = await getProducts({ category: null });
  const user = await getCurrentUser();

  return (
    <div className="w-full h-full">
      <ManageProducts products={products} />
    </div>
  );
}
