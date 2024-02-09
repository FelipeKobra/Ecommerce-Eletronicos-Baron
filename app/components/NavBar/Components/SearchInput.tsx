"use client";

import axios, { CancelTokenSource } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import truncateNames from "@/utils/Formaters/formatName";
import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const [produtos, setProdutos] = useState<ProductArrayType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cancelTokenRef = useRef<CancelTokenSource | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { searchTerm: "" } });

  function onSubmit(data: FieldValues) {
    if (!data.searchTerm && params?.size === 0) return router.push("/");

    let query = {};
    if (params) {
      query = queryString.parse(params.toString());
    }

    const updatedQuery: any = { ...query, searchTerm: data.searchTerm };
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    const searchPhrase = searchInput;
    router.push(url);
    setValue("searchTerm", searchPhrase);
  }

  const searchInput = watch("searchTerm");

  useEffect(() => {
    if (searchInput) {
      (async function getSearchProducts() {
        if (cancelTokenRef.current) {
          cancelTokenRef.current.cancel();
        }
        cancelTokenRef.current = axios.CancelToken.source();
        try {
          setIsLoading(true);
          const response = await axios.post(
            "/api/products/search-input",
            { searchInput, take: 5 },
            { cancelToken: cancelTokenRef.current.token }
          );
          setProdutos(response.data);
          setIsLoading(false);
        } catch (error: any) {
          if (!axios.isCancel(error)) {
            setIsLoading(false);
            throw new Error(error);
          }
        }

        cancelTokenRef.current.cancel();
      })();
    }
  }, [searchInput]);

  return (
    <div className="h-full w-full lg:w-10/12 xl:w-full relative">
      <form
        className="relative flex items-center h-full w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isFocused && isLoading && searchInput.length > 0 && (
          <span className="absolute opacity-55 left-[-3.5rem] loading loading-spinner loading-lg"></span>
        )}
        <input
          {...register("searchTerm")}
          className="h-full w-2/3 bg-base-200 indent-4 text-base-content rounded-lg rounded-r-none focus:outline-none"
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
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
      <div className="absolute w-full flex flex-col z-50">
        {(isFocused || isHovered) &&
          !isLoading &&
          searchInput.length > 0 &&
          produtos.length === 0 && (
            <div className="flex items-center justify-center text-center w-full h-[5rem] bg-base-100 text-base-content rounded-sm border-2">
              <p>Nenhum produto encontrado</p>
            </div>
          )}
        {(isFocused || isHovered) &&
          searchInput.length > 0 &&
          produtos &&
          produtos.length > 0 &&
          produtos.map((produto) => (
            <Link
              className="flex items-center w-full h-[5rem] bg-base-100 text-base-content rounded-sm border-2 hover:border-accent "
              key={produto.id}
              href={`/produto/${produto.id}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-white flex justify-center items-center rounded-lg mx-2 h-full max-w-[70%] max-h-[90%] ">
                <Image
                  className="mx-4  max-h-[100%]"
                  src={produto.ProductVariable[0].image}
                  alt={`Escolha do produto ${produto.name}`}
                  width={40}
                  height={40}
                />
              </div>

              <div>
                <p className="font-medium">{truncateNames(produto.name)}</p>
                <p className="text-md">{produto.brand}</p>
                <p className="text-sm">{produto.category}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
