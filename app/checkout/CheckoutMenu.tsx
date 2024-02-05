"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { LocalStorageContext } from "@/utils/providers/LocalStorageProvider";

import CheckoutForm from "./CheckoutForm";
import CheckoutError from "./components/CheckoutError";
import CheckoutNoItem from "./components/CheckoutNoItems";
import PaymentSuccess from "./components/CheckoutPaymentSuccess";

import LoadingScreen from "../components/LoadingScreen";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutMenu() {
  const router = useRouter();

  const { cartItems, paymentIntent, setPaymentIntentLocalStorage, tema } =
    useContext(LocalStorageContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucess, setPaymentSucess] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: signal,
          body: JSON.stringify({
            items: cartItems,
            payment_intent_id: paymentIntent,
          }),
        });

        if (response.status === 401) {
          return router.push("/login");
        }

        const data = await response.json();
        setClientSecret(data.paymentIntent.client_secret);
        setPaymentIntentLocalStorage(data.paymentIntent.id);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
          console.log(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (cartItems) {
      fetchData();
    }

    // Cleanup function
    return function cleanup() {
      abortController.abort();
    };
  }, [cartItems, paymentIntent, router, setPaymentIntentLocalStorage]);

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
      {!loading && !error && !paymentSucess && !cartItems && <CheckoutNoItem />}
    </div>
  );
}
