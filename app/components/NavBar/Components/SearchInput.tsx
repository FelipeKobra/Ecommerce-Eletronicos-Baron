"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, useForm } from "react-hook-form";


export default function SearchInput() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { searchTerm: "" } });

  function onSubmit(data: FieldValues) {
    
    if (!data.searchTerm) return router.push("/");
    ;

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  }

  return (
    <form className="h-full w-full" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("searchTerm")}
        className="h-full w-2/3 bg-base-200 indent-4 text-base-content rounded-lg rounded-r-none focus:outline-none"
        autoComplete="off"
        id="searchInput"
        placeholder="Procure Já..."
        type="text"
      />
      <button
        type="submit"
        className="h-full w-1/3 bg-base-content hover:bg-primary duration-300 text-base-100 rounded-lg rounded-l-none "
      >
        Search
      </button>
    </form>
  );
}
