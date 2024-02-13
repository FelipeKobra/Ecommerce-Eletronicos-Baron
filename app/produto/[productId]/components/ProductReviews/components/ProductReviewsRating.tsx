import { Rating } from "@mui/material";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

import { ProductReviewsSchemaType } from "../types/ProductReviewsSchema";

interface ProductReviewsRatingProps {
  rating: number;
  errors: FieldErrors<ProductReviewsSchemaType>;
  setValue: UseFormSetValue<ProductReviewsSchemaType>;
}

export default function ProductReviewsRating({
  rating,
  errors,
  setValue,
}: ProductReviewsRatingProps) {
  return (
    <div>
      <p className="my-2 text-xl lg:text-lg">Nota</p>
      <Rating
      color="#f6ea0fF"
      size="large"
        value={rating}
        onChange={(event, newValue) => {
          setValue("rating", newValue!);
        }}
      />
      {errors.rating && <p className="text-error">{errors.rating.message}</p>}
    </div>
  );
}
