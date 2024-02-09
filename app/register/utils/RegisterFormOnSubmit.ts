import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { PascalName } from "@/utils/Formaters/formatName";

import { signUpSchemaType } from "../types/signUpSchema";

interface RegisterFormOnSubmitProps {
  formValues: signUpSchemaType;
  router: AppRouterInstance;
  setIsLoading: (value: boolean) => void;
}

export default async function RegisterFormOnSubmit({
  formValues,
  router,
  setIsLoading,
}: RegisterFormOnSubmitProps) {
  setIsLoading(true);

  try {
    await axios.post("/api/register", formValues);

    toast.success("Conta Criada com sucesso! 😉");
    const callBack = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });

    if (callBack?.ok) {
      toast.success(`Boas Vindas ${PascalName(formValues.name)}`);
      router.push("/cart");
      router.refresh();
    } else if (callBack?.error) {
      toast.error(callBack.error);
    } else {
      toast.error("Algo deu errado, tente novamente!");
    }
  } catch (error) {
    toast.error("Algo deu errado, tente novamente!");
  } finally {
    setIsLoading(false);
  }
}
