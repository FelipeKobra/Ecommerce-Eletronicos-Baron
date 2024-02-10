"use client";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

import CheckoutPrice from "./components/CheckoutPrice";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSucess: (value: boolean) => void;
}

export default function CheckoutForm({
  clientSecret,
  handlePaymentSucess,
}: CheckoutFormProps) {
  const router = useRouter();
  const { removeLocalStorage, cartItems } = useContext(LocalStorageContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret || clientSecret.length < 3) {
      return;
    }
    handlePaymentSucess(false);
  }, [clientSecret, stripe, handlePaymentSucess]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!result.error) {
      toast.success("Pagamento Realizado com Sucesso!");
      removeLocalStorage();
      localStorage.removeItem("Cart_Intent");
      window.scrollTo(0, 0);
      router.refresh();
      handlePaymentSucess(true);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-11/12 md:w-10/12 lg:w-3/4 my-[5rem] shadow-2xl p-[2rem] lg:p-[5rem] "
    >
      <div>
        <h1 className="text-3xl ">
          Insira suas informações para finalizar o Checkout
        </h1>
        <div className="opacity-55">
          <p>
            Não utilize informações reais, já que é um projeto que não visa
            vender os respectivos produtos
          </p>
          <p className="pb-1 pt-4">Utilize as informações de Cartão abaixo: </p>
          <p>Nº 4242 4242 4242 4242</p>
          <p>Validade: 4/44</p>
          <p>CVC: 444</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl mt-10 mb-2">Endereço</h2>
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["BR"],
            autocomplete: { mode: "automatic" },
          }}
        />
      </div>
      <div>
        <h2 className="text-xl mt-10 mb-2">Informações de Pagamento</h2>
        <PaymentElement id="payment-card" options={{ layout: "tabs" }} />
      </div>
      <div>
        <CheckoutPrice CartItems={cartItems} />
      </div>
      <div className="flex justify-center">
        <button
          disabled={loading || !stripe || !elements}
          className="flex justify-center items-center w-10/12 md:w-3/4 lg:w-1/2 h-14 mt-6 text-lg md:text-xl lg:text-3xl bg-base-content text-base-100 rounded-md hover:bg-success duration-300"
        >
          {loading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            "Realizar Pagamento"
          )}
        </button>
      </div>
    </form>
  );
}
