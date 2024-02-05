import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

import "moment/locale/pt-br";
import AddReview from "./ProductReviews/AddReview";
import UsersRating from "./ProductReviews/UsersRating";

export default async function ProductReviews({
  produto,
}: {
  produto: ProductType;
}) {
  const reviews = produto?.ProductReview;
  const user = await getCurrentUser();



  return (
    <div className="flex flex-col justify-start gap-6 w-10/12">
      <AddReview product={produto} user={user} />
      <UsersRating reviews={reviews}/>
    </div>
  );
}
