"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { any } from "zod";

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
  setCartItems: any;
  changeCartItemQuantity: (
    productId: string,
    color: string,
    quantity: number
  ) => void;
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
  setCartItems: any,
  changeCartItemQuantity: (
    productId: string,
    color: string,
    quantity: number
  ) => {},
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

  //Load cart items and update when cartVolume changes
  const [cartItems, setCartItems] = useState<LocalStorageItem[] | null>(null);

  useEffect(() => {
    if (!cartItems) {
      const cartStorage = localStorage.getItem(CART_KEY);
      if (cartStorage) {
        const parsedCartStorage = JSON.parse(cartStorage);
      if (JSON.stringify(parsedCartStorage) !== JSON.stringify(cartItems)) {
        setCartItems(parsedCartStorage);
      }
      }
    }
  }, [cartItems]);

  useEffect(() => {
    const cartStorage = localStorage.getItem(CART_KEY);
    if (cartItems && cartItems.length > 0)
    if (JSON.stringify(cartItems) !== cartStorage) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Load cart quantity from local storage on mount.
  const [cartVolume, setCartVolume] = useState(0);

  useEffect(() => {
    if (cartItems) {
      setCartVolume(calculateVolume(cartItems));
    } else {
      setCartVolume(0);
    }
  }, [cartItems]);

  // // // // // // // // //Local Storage Section // // // // // // // // // //

  //set payment intent on Local Storage
  function setPaymentIntentLocalStorage(value: string | null) {
    localStorage.setItem(INTENT_KEY, JSON.stringify(value));
    setPaymentIntent(value);
  }
  //Update the local storage items quantity
  const updateCartQuantity = (value: LocalStorageItem): void => {
    if (cartItems) {
      const newItem = cartItems.find(
        (item) =>
          item.productId === value.productId && item.color === value.color
      );

      if (newItem && value.inputName) {
        newItem.quantity += value.inputName === "add" ? 1 : -1;

        const newItemIndex = cartItems.findIndex(
          (item) =>
            item.productId === value.productId && item.color === value.color
        );

        const newCartItems = cartItems.map((item, index) =>
          index === newItemIndex ? newItem : item
        );

        setCartItems(newCartItems);
      }
    }
  };

  function changeCartItemQuantity(
    productId: string,
    color: string,
    quantity: number
  ) {
    if (cartItems) {
      const newCartItem = cartItems.find(
        (item) => item.productId === productId && item.color === color
      );
      const newCartItemIndex = cartItems.findIndex(
        (item) => item.productId === productId && item.color === color
      );

      if (newCartItem) {
        newCartItem.quantity = quantity;

        const newCartItems = cartItems.map((item, index) =>
          index === newCartItemIndex ? newCartItem : item
        );

        setCartItems(newCartItems);
      }
    }
  }

  // Delete the Local storage Cart Item
  const removeLocalStorage = (): void => {
    setCartItems(null);
    localStorage.removeItem(CART_KEY);
    router.refresh();
  };

  // Delete a specific item
  const removeItem = (id: string, color: string): void => {
    if (cartItems) {
      if (cartItems.length > 1) {
        const newCartItems = cartItems?.filter(
          (item) => item.productId !== id || item.color !== color
        );

        setCartItems(newCartItems);
      } else if ((cartItems.length = 1)) {
        setCartItems(null);
        localStorage.removeItem(CART_KEY);
      }

      toast.error("Produto Removido");
      router.refresh();
    }
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
        tema,
        setTema,
        cartVolume,
        cartItems,
        setCartItems,
        changeCartItemQuantity,
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
