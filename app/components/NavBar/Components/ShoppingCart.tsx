"use client";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useContext } from "react";

import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

export default function ShoppingCart() {
  const { cartVolume } = useContext(LocalStorageContext);
  return (
    <div>
      <Link href="/cart" className="relative">
        <ShoppingCartIcon className="text-base-content" fontSize="large" />
        <span
          className={`absolute ${cartVolume > 99 && "text-xs"} bottom-4 right-4 select-none rounded-full h-6 w-6 bg-primary text-base-100 flex items-center justify-center`}
        >
          {cartVolume}
        </span>
      </Link>
    </div>
  );
}
