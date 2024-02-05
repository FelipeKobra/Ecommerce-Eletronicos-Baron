"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { z } from "zod";

import { PascalName } from "@/utils/Formaters/formatName";
import passwordHasRequiredChars from "@/utils/types/passwordRequiredChars";
import { currentUserType } from "@/utils/types/types";

import AlreadyLogged from "./AlreadyLogged";
import { GoogleSignupButton, SubmitButton } from "./Buttons";
import FormInput from "./FormInput";



// Register Schema
const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Digite seu nome")
    .max(100, "Nome não pode passar de 100 caracteres"),
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

export default function RegisterForm({
  currentUser,
}: {
  currentUser: currentUserType | null;
}) {
  //router Config
  const router = useRouter();

  //Redirect if Logged
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
      toast.error("Você já está logado", {
        id: "Already Logged",
      });
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

  return currentUser ? (
    <AlreadyLogged />
  ) : (
    <div className="w-2/5 h-[50rem] flex flex-col  shadow-lg justify-evenly items-center py-4">
      <h1 className="text-4xl">Registrar-se</h1>
      <GoogleSignupButton />
      <hr className="w-11/12" />
      <form
        className="flex flex-col gap-8 items-center w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          errorMessage={errors.name?.message}
          errors={errors}
          id="name"
          placeholder="Nome"
          register={register}
          type="text"
          key={v4()}
        />
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
          Já possui Conta?{" "}
          <Link className="link-primary" href="/login">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
