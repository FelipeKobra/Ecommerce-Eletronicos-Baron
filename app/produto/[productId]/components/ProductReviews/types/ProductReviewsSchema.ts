import { z } from "@/utils/interfaces/portugueseZod";

const ProductReviewsSchema = z.object({
  comment: z.string().min(30).max(1000),
  rating: z.number().min(1).max(5),
});

export type ProductReviewsSchemaType = z.infer<typeof ProductReviewsSchema>;

export default ProductReviewsSchema