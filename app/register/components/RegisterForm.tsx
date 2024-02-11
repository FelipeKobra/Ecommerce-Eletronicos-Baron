"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import LoadingScreen from "@/app/components/LoadingScreen";
import { currentUserType } from "@/utils/types/types";

import { GoogleSignupButton, SubmitButton } from "./Buttons";
import FormInput from "./FormInput";

import signUpSchema, { signUpSchemaType } from "../types/signUpSchema";
import RegisterFormOnSubmit from "../utils/RegisterFormOnSubmit";

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
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  //Submit Function
  async function onSubmit(formValues: signUpSchemaType) {
    RegisterFormOnSubmit({ formValues, router, setIsLoading });
  }

  return currentUser ? (
    <LoadingScreen />
  ) : (
    <div className="w-11/12 md:w-9/12 lg:w-3/5 xl:w-1/2 h-[50rem] flex flex-col gap-2 shadow-lg justify-evenly items-center py-4 mb-14">
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
        />
        <FormInput
          errorMessage={errors.email?.message}
          errors={errors}
          id="email"
          placeholder="Email"
          register={register}
          type="email"
        />
        <FormInput
          errorMessage={errors.password?.message}
          errors={errors}
          id="password"
          placeholder="Senha"
          register={register}
          type="password"
        />

        <SubmitButton text="Registrar" isLoading={isLoading} />

        <p>
          Já possui Conta?&nbsp;
          <Link className="link-primary" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
