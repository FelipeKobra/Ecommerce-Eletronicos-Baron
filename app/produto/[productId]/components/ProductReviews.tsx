import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

import AddReview from "./ProductReviews/AddReview";
import UsersRating from "./ProductReviews/UsersRating";


import "moment/locale/pt-br";

export default async function ProductReviews({
  produto,
}: {
  produto: ProductType;
}) {
  const reviews = produto?.ProductReview;
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col justify-start gap-6 w-full">
      <AddReview product={produto} user={user} />
      <UsersRating reviews={reviews} />
    </div>
  );
}
