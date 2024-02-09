import { z } from "@/utils/interfaces/portugueseZod";
import passwordHasRequiredChars from "@/utils/types/passwordRequiredChars";

const signInSchema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .max(254, "Email não pode passar de 254 caracteres"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha não pode ser maior que 100 caracteres")
    .refine(
      passwordHasRequiredChars,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    ),
});

export default signInSchema;
export type signInSchemaType = z.infer<typeof signInSchema>;
