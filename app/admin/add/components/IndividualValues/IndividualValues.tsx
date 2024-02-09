"use client";

import { useCallback, useEffect } from "react";

import IndividualStock from "./components/IndividualStock";
import { handleCheckedProps } from "./types/IndividualValuesProps";
import handleValues from "./utils/handleValues";
import IndividualPrice from "./components/IndividualPrice";

export default function IndividualValues({
  maxPrice,
  maxStock,
  individualPrice,
  individualStock,
  setIndividualPrice,
  setIndividualStock,
  register,
  setValue,
  watch,
  errors,
  id,
}: handleCheckedProps) {
  //Watchs
  const globalPrice = watch("globalPrice");
  const globalStock = watch("globalStock");

  //Custom SetValue que consegue "zerar" as strings
  const customSetValue = useCallback(
    (name: "globalPrice" | "globalStock", value: any) => {
      setValue(name, value);
    },
    [setValue]
  );

  //Altera o Indiviudal Value correto
  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    const { id } = e.target;

    if (id === "price") {
      setIndividualPrice(!individualPrice);
    }
    if (id === "quantity") {
      setIndividualStock(!individualStock);
    }
  }

  //Controlled Components dos valores
  useEffect(() => {
    handleValues({
      globalPrice,
      globalStock,
      maxPrice,
      maxStock,
      customSetValue,
    });
  }, [customSetValue, globalPrice, globalStock, maxPrice, maxStock]);

  //Zera os valores quando setados individuais
  useEffect(() => {
    if (individualPrice) {
      customSetValue("globalPrice", "");
    }

    if (individualStock) {
      customSetValue("globalStock", "");
    }
  }, [individualPrice, individualStock, customSetValue]);

  return (
    <>
      <input
        className="checkbox-primary checkbox"
        checked={id === "price" ? individualPrice : individualStock}
        id={id}
        type="checkbox"
        onChange={handleChecked}
      />
      {id === "price" && !individualPrice && (
        <IndividualPrice
          globalPrice={globalPrice}
          maxPrice={maxPrice}
          errors={errors}
          register={register}
        />
      )}
      {id === "quantity" && !individualStock && (
        <IndividualStock
          globalStock={globalStock}
          maxStock={maxStock}
          errors={errors}
          register={register}
        />
      )}
    </>
  );
}
