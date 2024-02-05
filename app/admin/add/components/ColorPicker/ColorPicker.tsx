"use client";

import { useCallback, useEffect, useState } from "react";

import CancelImage from "./components/CancelImage";
import IndividualPrice from "./components/IndividualPrice";
import IndividualStock from "./components/IndividualStock";
import SelectImage from "./components/SelectImage";
import ColorPickerProps from "./types/ColorPickerProps";
import handleValues from "./utils/handleValues";

import { variableItemForm } from "../zodConfig/schemas";

export default function ColorPicker({
  maxPrice,
  maxStock,
  index,
  isProductCreated,
  individualPrice,
  individualStock,
  variable,
  errors,
  register,
  watch,
  setValue,
}: ColorPickerProps) {
  //Produto Criado fechar caixa de seleção e deletar arquivo
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  //States e watch's
  const [isSelected, setIsSelected] = useState(false);
  const [File, setFile] = useState<File | null>(null);
  const price = watch(`variables.${index}.price`);
  const quantity = watch(`variables.${index}.stock`);

  //Custom SetValue para o Color Picker
  const colorPickerSetValue = useCallback(
    (name: keyof variableItemForm, value: any) => {
      setValue(`variables.${index}.${name}`, value);
    },
    [setValue, index]
  );

  //Adicionar o arquivo no State e no Form
  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      colorPickerSetValue("image", value);
    },
    [colorPickerSetValue]
  );

  //Muda a cor para selecionada e define como escolhida no UseForm
  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);
      colorPickerSetValue("isChosen", e.target.checked);

      if (!e.target.checked) {
        setFile(null);
      }
    },
    [colorPickerSetValue]
  );

  //Formata os valores do formulário em controlled Components
  useEffect(() => {
    handleValues({ price, maxPrice, quantity, maxStock, colorPickerSetValue });
  }, [colorPickerSetValue, price, quantity, maxPrice, maxStock]);

  return (
    <div className="flex flex-col gap-4 py-6 min-h-[5rem] text-center justify-center items-center rounded-md border-solid border-base-200 border-2 hover:border-base-content duration-500">
      <label className="text-xl" htmlFor={variable.color}>
        {variable.color}
      </label>
      <input
        className="cursor-pointer checkbox border-base-content"
        type="checkbox"
        id={variable.color}
        checked={isSelected}
        onChange={handleCheck}
      />
      {isSelected && individualPrice && (
        <IndividualPrice
          index={index}
          price={price}
          maxPrice={maxPrice}
          errors={errors}
          register={register}
        />
      )}
      {isSelected && individualStock && (
        <IndividualStock
          index={index}
          quantity={quantity}
          maxStock={maxStock}
          errors={errors}
          register={register}
        />
      )}
      {isSelected && !File && (
        <SelectImage
          index={index}
          register={register}
          handleFileChanger={handleFileChange}
        />
      )}
      {File && (
        <CancelImage
          File={File}
          setFile={setFile}
          colorPickerSetValue={colorPickerSetValue}
        />
      )}
    </div>
  );
}
