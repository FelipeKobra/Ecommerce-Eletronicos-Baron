"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { bodyRatingProps } from "@/app/api/rating/route";
import checkAuthToReview from "@/utils/functions/checkAuthToReview";
import { UserQueryResult } from "@/utils/interfaces/getPrismaItems/getCurrentUser";
import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";
import { z } from "@/utils/interfaces/portugueseZod";



const schema = z.object({
  comment: z.string().min(30).max(1000),
  rating: z.number().min(1).max(5),
});

type formSchema = z.infer<typeof schema>;

interface AddReviewProps {
  product: ProductType;
  user: UserQueryResult;
}

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
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { comment: "", rating: 5 },
  });

  async function onSubmit(data: formSchema) {
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

  const rating = watch("rating");
  const comment = watch("comment");

  const isAuth = checkAuthToReview({ product, user });

  if (isAuth)
    return (
      <div className="flex flex-col gap-2 max-w-[800px]">
        <h1 className="text-3xl">Dê sua avaliação sobre o produto!</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="my-2 text-lg">Nota</p>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setValue("rating", newValue!);
              }}
            />
            {errors.rating && (
              <p className="text-error">{errors.rating.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <textarea
              className=" w-full h-[8rem] text-lg textarea textarea-bordered focus:outline-primary hover:border-base-content duration-300"
              placeholder="Avaliação"
              {...register("comment")}
            ></textarea>
            <div className="w-full grid grid-cols-2">
              <div>
                {errors.comment && (
                  <p className="text-error">{errors.comment.message}</p>
                )}
              </div>
              <p className="text-end">{comment.length}/1000</p>
            </div>
          </div>
          <button disabled={isLoading} className="w-1/2 btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    );
}
