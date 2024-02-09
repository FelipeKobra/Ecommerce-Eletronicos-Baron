"use client";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useContext } from "react";

import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

export default function ShoppingCart() {
  const { cartVolume } = useContext(LocalStorageContext);
  return (
    <div className="relative ">
      <Link href="/cart" className="  mx-8 sm:mx-12 xl:mx-20 ">
        <ShoppingCartIcon className="text-base-content" fontSize="large" />
      </Link>
      <span className="absolute top-[-8px] right-1/3 select-none rounded-full h-6 w-6 bg-primary text-base-100 flex items-center justify-center">
        {cartVolume}
      </span>
    </div>
  );
}
