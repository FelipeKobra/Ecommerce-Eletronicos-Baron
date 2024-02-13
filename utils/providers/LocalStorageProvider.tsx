"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Key of the cart data in local storage.
const CART_KEY = "Cart";
const INTENT_KEY = "Cart_Intent";

export type LocalStorageItem = {
  productId: string;
  quantity: number;
  color: string;
  cartVolume?: number;
  inputName?: string;
};

export type LocalStorageContextType = {
  setTema: (value: string) => void;
  tema: string;
  cartVolume: number;
  cartItems: LocalStorageItem[] | null;
  getLocalStorage: () => LocalStorageItem[] | null;
  setCartLocalStorage: (value: LocalStorageItem) => void;
  updateCartQuantity: (value: LocalStorageItem) => void;
  removeLocalStorage: () => void;
  removeItem: (id: string, color: string) => void;
  paymentIntent: string | null;
  setPaymentIntent: (value: string | null) => void;
  setPaymentIntentLocalStorage: (value: string | null) => void;
};

export const LocalStorageContext = createContext<LocalStorageContextType>({
  setTema: (value: string) => null,
  tema: "",
  cartVolume: 0,
  cartItems: null,
  getLocalStorage: () => null,
  setCartLocalStorage: (value: LocalStorageItem) => {},
  updateCartQuantity: (value: LocalStorageItem) => {},
  removeLocalStorage: () => {},
  removeItem: (id: string, color: string) => {},
  paymentIntent: "",
  setPaymentIntent: (value: string | null) => null,
  setPaymentIntentLocalStorage: (value: string | null) => {},
});

// Helper function to calculate total volume of a cart data set.
const calculateVolume = (arr: LocalStorageItem[]): number => {
  return arr.map((e) => e.quantity).reduce((act, acc) => act + acc, 0);
};

// // // // // // // //Provider Section // // // // // // // // // //

const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // Load cart quantity from local storage on mount.
  const [cartVolume, setCartVolume] = useState(0);

  useEffect(() => {
    const localStorageValue = localStorage.getItem(CART_KEY);
    if (localStorageValue) {
      const parsedData: LocalStorageItem[] = JSON.parse(localStorageValue);
      if (Array.isArray(parsedData)) {
        const volume = calculateVolume(parsedData);
        setCartVolume(volume);
      }
    }
  }, []);

  //Load cart items and update when cartVolume changes
  const [cartItems, setCartItems] = useState<LocalStorageItem[] | null>(null);

  useEffect(() => {
    const localStorageValue = localStorage.getItem(CART_KEY);

    const parsedData: LocalStorageItem[] | null = localStorageValue
      ? JSON.parse(localStorageValue)
      : null;

    setCartItems(parsedData);
  }, [cartVolume]);

  // // // // // // // // //Local Storage Section // // // // // // // // // //

  // Helper function to handle localStorage.
  const handleLocalStorage = (
    action: (items: LocalStorageItem[]) => LocalStorageItem[]
  ): void => {
    const raw = localStorage.getItem(CART_KEY);
    let items: LocalStorageItem[] = raw ? JSON.parse(raw) : [];
    items = action(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    const volume = calculateVolume(items);
    setCartVolume(volume);
  };

  // Get the local storage items
  const getLocalStorage = (): LocalStorageItem[] | null => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : null;
  };

  // Set the local storage items
  const setCartLocalStorage = (value: LocalStorageItem): void => {
    handleLocalStorage((items) => {
      const existingIndex = items.findIndex(
        (item) =>
          item.productId === value.productId && item.color === value.color
      );
      if (existingIndex !== -1) {
        items[existingIndex].quantity = value.quantity;
      } else {
        items.push(value);
      }
      return items;
    });
  };

  //set payment intent on Local Storage
  function setPaymentIntentLocalStorage(value: string | null) {
    localStorage.setItem(INTENT_KEY, JSON.stringify(value));
    setPaymentIntent(value);
  }
  //Update the local storage items quantity
  const updateCartQuantity = (value: LocalStorageItem): void => {
    handleLocalStorage((items) => {
      const item = items.find(
        (item) =>
          item.productId === value.productId && item.color === value.color
      );
      if (item && value.inputName) {
        item.quantity += value.inputName === "add" ? 1 : -1;
      }
      return items;
    });
  };

  // Delete the Local storage Cart Item
  const removeLocalStorage = (): void => {
    localStorage.removeItem(CART_KEY);
    setCartVolume(0);
  };

  // Delete a specific item
  const removeItem = (id: string, color: string): void => {
    handleLocalStorage((items) => {
      return items.filter(
        (item) => item.productId !== id || item.color !== color
      );
    });
    toast.error("Produto Removido");
  };

  // // // // // // // // //Payment Intent Section ////////////////

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  //Get payment Intent
  useEffect(() => {
    const cart_payment_intent: string | null = localStorage.getItem(INTENT_KEY);
    if (cart_payment_intent && cart_payment_intent !== undefined) {
      const payment_intent: string = JSON.parse(cart_payment_intent);
      setPaymentIntent(payment_intent);
    }
  }, []);

  // // // // // // // //Theme Section // // // // // // //
  const [tema, setTema] = useState("");

  useEffect(() => {
    function updateTheme() {
      const currentTheme = localStorage.getItem("theme");
      currentTheme && setTema(currentTheme);

      if (!currentTheme) {
        localStorage.setItem("theme", "light");
        setTema("light");
        document.querySelector("html")?.setAttribute("data-theme", "light");
      }
    }

    updateTheme();
  }, [router]);

  return (
    <LocalStorageContext.Provider
      value={{
        setTema,
        tema,
        cartVolume,
        cartItems,
        getLocalStorage,
        setCartLocalStorage,
        updateCartQuantity,
        removeLocalStorage,
        removeItem,
        paymentIntent,
        setPaymentIntent,
        setPaymentIntentLocalStorage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageProvider;
