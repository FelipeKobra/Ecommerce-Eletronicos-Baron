"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import checkAuthToReview from "@/utils/functions/checkAuthToReview";

import ProductReviewsComment from "./components/ProductReviewsComment";
import ProductReviewsRating from "./components/ProductReviewsRating";
import { AddReviewProps } from "./types/AddReviewProps";
import ProductReviewsSchema, {
  ProductReviewsSchemaType,
} from "./types/ProductReviewsSchema";
import ProductReviewsOnSubmit from "./utils/ProductReviewsOnSubmit";


export default function AddReview({ product, user }: AddReviewProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductReviewsSchemaType>({
    resolver: zodResolver(ProductReviewsSchema),
    mode: "onChange",
    defaultValues: { comment: "", rating: 5 },
  });

  async function onSubmit(data: ProductReviewsSchemaType) {
    ProductReviewsOnSubmit({
      data,
      product,
      router,
      user,
      reset,
      setIsLoading,
    });
  }

  const rating = watch("rating");
  const comment = watch("comment");

  const isAuth = checkAuthToReview({ product, user });

  if (isAuth)
    return (
      <div className="flex flex-col gap-2 w-10/12 md:w-11/12 lg:w-full max-w-[800px] my-4 pl-4">
        <h1 className="text-3xl">Dê sua avaliação sobre o produto!</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <ProductReviewsRating
            errors={errors}
            rating={rating}
            setValue={setValue}
          />
          <div className="flex flex-col gap-3">
            <textarea
              className=" w-full h-[8rem] text-lg textarea textarea-bordered focus:outline-primary hover:border-base-content duration-300"
              placeholder="Avaliação"
              {...register("comment")}
            ></textarea>
            <ProductReviewsComment comment={comment} errors={errors} />
          </div>
          <button disabled={isLoading} className="w-full sm:w-3/4 lg:w-1/2 btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    );
}
