"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import LoadingScreen from "@/app/components/LoadingScreen";
import { currentUserType } from "@/utils/types/types";

import { GoogleSignupButton, SubmitButton } from "./Buttons";
import FormInputLogin from "./FormInputLogin";

import signInSchema, { signInSchemaType } from "../types/signInSchema";
import onSubmitLogin from "../utils/onSubmitLogin";

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
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  //Submit Function
  async function onSubmit(formValues: signInSchemaType) {
    onSubmitLogin({ router, formValues, setIsLoading });
  }

  return currentUser ? (
    <LoadingScreen />
  ) : (
    <div className=" w-11/12 md:w-9/12 lg:w-3/5 xl:w-2/5 h-[45rem] flex flex-col gap-8 rounded-xl shadow-md justify-center items-center pb-4 mb-12">
      <h1 className="text-4xl">Login</h1>
      <GoogleSignupButton />
      <hr className="w-11/12" />
      <form
        className="flex flex-col gap-8 items-center  w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInputLogin
          errorMessage={errors.email?.message}
          errors={errors}
          id="email"
          placeholder="Email"
          register={register}
          type="email"
        />
        <FormInputLogin
          errorMessage={errors.password?.message}
          errors={errors}
          id="password"
          placeholder="Senha"
          register={register}
          type="password"
        />

        <SubmitButton text="Entrar" isLoading={isLoading} />

        <p>
          Não possui conta?&nbsp;
          <Link className="link-primary" href="/register">
            Registrar-se
          </Link>
        </p>
      </form>
    </div>
  );
}
