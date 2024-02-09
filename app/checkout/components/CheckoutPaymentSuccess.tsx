"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPaymentSuccess() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70svh] h-full">
      <h1 className="text-center text-3xl text-base-content select-none">
        Pagamento Realizado com{" "}
        <span className="text-success inline-block animate-bounce">
          Sucesso
        </span>
      </h1>
      <h2 className="text-center text-2xl text-base-content select-none">
        Obrigado por comprar conosco!
      </h2>
      <Link
        onClick={() => router.refresh()}
        href="/pedidos"
        className="btn btn-primary mt-4 btn-lg duration-300 hover:opacity-45"
      >
        Veja seus pedidos
      </Link>
    </div>
  );
}
