import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { signInSchemaType } from "../types/signInSchema";

interface onSubmitLoginProps {
  router: AppRouterInstance;
  formValues: signInSchemaType;
  setIsLoading: (value: boolean) => void;
}

export default async function onSubmitLogin({
  router,
  formValues,
  setIsLoading,
}: onSubmitLoginProps) {
  setIsLoading(true);

  const callBack = await signIn("credentials", {
    ...formValues,
    redirect: false,
  });
  setIsLoading(false);

  if (callBack?.ok) {
    router.push("/cart");
    router.refresh();
    toast.success(`Bem Vindo de Volta!`);
  }

  if (callBack?.error) {
    toast.error(callBack.error, { id: "LoginError" });
  }
}
