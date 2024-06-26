"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

import CheckoutForm from "./CheckoutForm";
import CheckoutError from "./components/CheckoutError";
import CheckoutNoItem from "./components/CheckoutNoItems";
import PaymentSuccess from "./components/CheckoutPaymentSuccess";

import LoadingScreen from "../components/LoadingScreen";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutMenu() {
  const router = useRouter();

  const { cartItems, paymentIntent, setPaymentIntentLocalStorage, tema } =
    useContext(LocalStorageContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const [paymentSucess, setPaymentSucess] = useState(false);
  const requisitionAbort = useRef(false);

  useEffect(() => {
    if (!requisitionAbort.current) {
      const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
          const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: cartItems,
              payment_intent_id: paymentIntent,
            }),
          });

          if (response.status === 401) {
            toast.error("Verifique se está logado e tente novamente");
            localStorage.removeItem("Cart_Intent");
            return router.push("/login");
          }

          if (response.status === 400) {
            const data = await response.json();
            toast.error(data.error);
            localStorage.removeItem("Cart_Intent");
            return router.push("/cart");
          }

          const data = await response.json();
          setClientSecret(data.paymentIntent.client_secret);
          setPaymentIntentLocalStorage(data.paymentIntent.id);
          setLoading(false);
        } catch (error: any) {
          console.log(error);
          toast.error(error);
          setLoading(false);
          setError(true);
        }
      };

      if (cartItems && cartItems.length > 0) {
        fetchData();
      }
    }
    return () => {
      requisitionAbort.current = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: tema === "light" ? "stripe" : "night",
      labels: "floating",
    },
    locale: "pt-BR",
  };

  function handlePaymentSuccess(value: boolean) {
    setPaymentSucess(value);
  }

  return (
    <div className="App  flex flex-grow flex-col items-center justify-center">
      {!loading &&
        !error &&
        !paymentSucess &&
        clientSecret &&
        cartItems &&
        cartItems.length > 0 && (
          <Elements key={clientSecret} options={options} stripe={stripePromise}>
            <CheckoutForm
              handlePaymentSucess={handlePaymentSuccess}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      {error && <CheckoutError />}
      {!paymentSucess && !error && loading && <LoadingScreen />}
      {!error && paymentSucess && <PaymentSuccess />}
      {!loading &&
        !error &&
        !paymentSucess &&
        (!cartItems || cartItems.length === 0) && <CheckoutNoItem />}
    </div>
  );
}
