
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import getProducts from "@/utils/interfaces/getPrismaItems/getProducts";

import ManageProducts from "./ManageProducts";

export default async function page() {
  const products = await getProducts({ category: null });

  return (
    <div className="w-full h-full overflow-hidden">
      <ManageProducts products={products} />
    </div>
  );
}
