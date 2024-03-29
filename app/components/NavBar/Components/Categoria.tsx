"use client";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { IconType } from "react-icons";

import formatCategoryName from "@/utils/Formaters/formatCategoryName";
import LoadingScreen from "../../LoadingScreen";

interface CategoriaProps {
  label: string;
  Icon: IconType;
  selecionada?: boolean;
}

export default function Categoria({
  label,
  Icon,
  selecionada,
}: CategoriaProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [params]);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    if (label === "Geral") {
      router.push("/");
    } else {
      let query = {};

      if (params) {
        query = queryString.parse(params.toString());
      }

      const updatedQuery: any = { ...query, category: label };

      const url = queryString.stringifyUrl(
        { url: "/", query: updatedQuery },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={` flex justify-center items-center text-center gap-1 p-3 border-b-4 hover:text-white duration-300 cursor-pointer ${
        selecionada
          ? "border-primary text-white"
          : "border-transparent text-neutral-content"
      }`}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <Icon size={20} />
      )}
      <p className="font-medium text-md hidden xl:block ">
        {formatCategoryName(label)}
      </p>
    </div>
  );
}
