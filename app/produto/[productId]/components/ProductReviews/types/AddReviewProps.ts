import { UserQueryResult } from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

export interface AddReviewProps {
  product: ProductType;
  user: UserQueryResult;
}
