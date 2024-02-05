
import { ProductReview } from "@prisma/client";

import { UserQueryResult } from "../interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "../interfaces/getPrismaItems/getProductById";

interface checkAuthToReviewProps {
  product: ProductType;
  user: UserQueryResult;
}

export default function checkAuthToReview({
  product,
  user,
}: checkAuthToReviewProps) {
  if (!product || !user) {
    return false;
  }

  const pedidoEntregue = user?.Orders.some(
    (pedido) =>
      pedido.products.find((produto) => produto.id === product.id) &&
      pedido.deliveryStatus === "Entregue"
  );

  const userReview = product.ProductReview.find((review: ProductReview) => {
    return review.userId === user.id;
  });

  if (userReview || !pedidoEntregue) {
    return false;
  }

  return true;
}
