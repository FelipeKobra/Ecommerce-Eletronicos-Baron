"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { z } from "zod";

import AlreadyLogged from "@/app/register/components/AlreadyLogged";
import { PascalName } from "@/utils/Formaters/formatName";
import passwordHasRequiredChars from "@/utils/types/passwordRequiredChars";
import { currentUserType } from "@/utils/types/types";

import { GoogleSignupButton, SubmitButton } from "./Buttons";

import FormInput from "../../register/components/FormInput";







// Register Schema
const signupSchema = z.object({
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

export default function LoginForm({
  currentUser,
}: {
  currentUser: currentUserType | null;
}) {
  //router
  const router = useRouter();

  //Redirect if Logged
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  //States
  const [isLoading, setIsLoading] = useState(false);

  //UseForm Config
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });

  //Submit Function
  async function onSubmit(formValues: FieldValues) {
    setIsLoading(true);

    const callBack = await signIn("credentials", {
      ...formValues,
      redirect: false,
    });
    setIsLoading(false);

    if (callBack?.ok) {
      router.push("/cart");
      router.refresh();
      toast.success(`Boas Vindas ${PascalName(formValues.name)}`);
    }

    if (callBack?.error) {
      toast.error(callBack.error);
    }
  }

  return currentUser ? (
    <AlreadyLogged />
  ) : (
    <div className="w-2/5 h-[45rem] flex flex-col gap-8 rounded-xl shadow-md justify-center items-center py-4">
      <h1 className="text-4xl">Login</h1>
      <GoogleSignupButton />
      <hr className="w-11/12" />
      <form
        className="flex flex-col gap-8 items-center  w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          errorMessage={errors.email?.message}
          errors={errors}
          id="email"
          placeholder="Email"
          register={register}
          type="email"
          key={v4()}
        />
        <FormInput
          errorMessage={errors.password?.message}
          errors={errors}
          id="password"
          placeholder="Senha"
          register={register}
          type="password"
          key={v4()}
        />

        <SubmitButton text="Registrar" isLoading={isLoading} />

        <p>
          Não possui conta?{" "}
          <Link className="link-primary" href="/register">
            Registrar-se
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
