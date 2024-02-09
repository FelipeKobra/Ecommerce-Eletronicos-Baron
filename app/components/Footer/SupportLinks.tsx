"use client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SupportLinks({ title }: { title: string }) {
  return (
    <Link
      onClick={() =>
        toast("O site não visa vender ou realizar a entrega dos produtos!",{id:'SupportLinkToast'})
      }
      className="link link-hover text-xl md:text-sm"
      href="#"
    >
      {title}
    </Link>
  );
}
