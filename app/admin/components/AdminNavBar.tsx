"use client";
import { usePathname } from "next/navigation";
import { IoMdAddCircle } from "react-icons/io";
import { MdAnalytics, MdBorderColor, MdInventory } from "react-icons/md";

import AdminNavItem from "./AdminNavItem";


export default function AdminNavBar() {
  const pathname = usePathname();
  return (
    <div className="w-full h-[4rem] bg-base-200 flex justify-center items-center">
      <div className="grid grid-cols-4 gap-8 justify-center items-center w-1/2 h-full">
        <AdminNavItem
          icon={MdAnalytics}
          label="Sumário"
          isSelected={pathname === "/admin"}
          linkHref="/admin"
        />
        <AdminNavItem
          icon={IoMdAddCircle}
          label="Adicionar"
          isSelected={pathname === "/admin/add"}
          linkHref="/admin/add"
        />
        <AdminNavItem
          icon={MdInventory}
          label="Produtos"
          isSelected={pathname === "/admin/manage"}
          linkHref="/admin/manage"
        />
        <AdminNavItem
          icon={MdBorderColor}
          label="Pedidos"
          isSelected={pathname === "/admin/orders"}
          linkHref="/admin/orders"
        />
      </div>
    </div>
  );
}
