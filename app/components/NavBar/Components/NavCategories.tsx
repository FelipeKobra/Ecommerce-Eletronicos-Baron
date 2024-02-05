"use client";
import { usePathname } from "next/dist/client/components/navigation";
import { useSearchParams } from "next/navigation";

import { categories } from "@/data/categories";

import Categoria from "./Categoria";


export default function NavCategories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  if (pathname !== "/") return;

  return (
    <div className={`w-full grid grid-cols-7 bg-neutral`}>
      {categories.map((categoria) => (
        <Categoria
          key={categoria.label}
          label={categoria.label}
          Icon={categoria.Icon}
          selecionada={
            category === categoria.label ||
            (category === null && categoria.label === "Geral")
          }
        />
      ))}
    </div>
  );
}
