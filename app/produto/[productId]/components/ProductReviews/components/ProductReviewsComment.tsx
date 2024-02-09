import { FieldErrors } from "react-hook-form";

import { ProductReviewsSchemaType } from "../types/ProductReviewsSchema";

interface ProductReviewsCommentProps {
  comment: string;
  errors: FieldErrors<ProductReviewsSchemaType>;
}

export default function ProductReviewsComment({
  comment,
  errors,
}: ProductReviewsCommentProps) {
  return (
    <div className="w-full grid grid-cols-2">
      <div>
        {errors.comment && (
          <p className="text-error">{errors.comment.message}</p>
        )}
      </div>
      <p className="text-end">{comment.length}/1000</p>
    </div>
  );
}
