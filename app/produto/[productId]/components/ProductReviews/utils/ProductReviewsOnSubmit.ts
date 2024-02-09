import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

import { bodyRatingProps } from "@/app/api/rating/route";
import { UserQueryResult } from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

import { ProductReviewsSchemaType } from "../types/ProductReviewsSchema";

interface ProductReviewsOnSubmitProps {
  data: ProductReviewsSchemaType;
  user: UserQueryResult;
  product: ProductType;
  router: AppRouterInstance;
  reset: UseFormReset<ProductReviewsSchemaType>;
  setIsLoading: (value: boolean) => void;
}

export default async function ProductReviewsOnSubmit({
  data,
  user,
  product,
  router,
  reset,
  setIsLoading,
}: ProductReviewsOnSubmitProps) {
  setIsLoading(true);
  try {
    if (user && product) {
      toast("Avialiação Enviada");
      const ratingData: bodyRatingProps = {
        comment: data.comment,
        rating: data.rating,
        product,
        userId: user.id,
      };

      await axios.post("/api/rating", ratingData);
      toast.success("Avaliação criada com sucesso");
      router.refresh();
      reset();
    }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setIsLoading(false);
  }
}
