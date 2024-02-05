import { z } from "@/utils/interfaces/portugueseZod";

export const variableSchema = z.object({
  color: z.string(),
  colorCode: z.string(),
  stock: z.coerce.number().min(0).max(1000),
  price: z.coerce.number().min(0).max(1000000),
  image: z.instanceof(File).nullable().default(null),
  imageURL: z.string().default(""),
  imagePath: z.string().default(""),
  isChosen: z.boolean().default(false),
});
export type variableItemForm = z.infer<typeof variableSchema>;

export const schema = z.object({
  productId: z.string().nullable().default(null),
  name: z.string().min(5).max(200),
  description: z.string().min(50).max(2000),
  brand: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  variables: z
    .array(variableSchema)
    .refine((data) => data.some((variable) => variable.isChosen), {
      message: "Escolha no mínimo uma cor para o produto!",
    }),
  globalPrice: z.coerce.number().min(0).max(1000000),
  globalStock: z.coerce.number().min(0).max(1000),
  removeBg: z.boolean().default(false),
});

export type AddForm = z.infer<typeof schema>;
export default schema;
