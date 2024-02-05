import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import CartProducts from "./CartProducts";


export default async function page() {
  const user = await getCurrentUser();
  
  return (
    <div>
      <CartProducts user={!!user} />
    </div>
  );
}
