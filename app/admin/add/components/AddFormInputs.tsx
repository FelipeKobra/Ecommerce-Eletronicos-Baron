import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { AddForm } from "./zodConfig/schemas";

interface FormInputsProps{
    currentLengthTA:string;
    errors: FieldErrors<AddForm>;
    register: UseFormRegister<AddForm>;
}

export default function AddFormInputs({currentLengthTA,errors,register}:FormInputsProps) {
  return (
    <>
      <input
        className="rounded-md input border-base-300 hover:border-base-content duration-300"
        placeholder="Nome do Produto"
        type="text"
        {...register("name")}
      />
      {errors["name"] && (
        <p className="text-error">{errors["name"]?.message as string}</p>
      )}
      <textarea
        className="textarea border-base-300 hover:border-base-content duration-300"
        placeholder="Descrição do Produto"
        id="description"
        cols={10}
        rows={5}
        {...register("description")}
      ></textarea>
      <div className="grid grid-cols-3">
        {errors["description"] && (
          <div className="self-center col-span-2">
            <p className="text-error">
              {errors["description"]?.message as string}
            </p>
          </div>
        )}
        <div
          className={`justify-self-end ${!errors.description && "col-span-3"}`}
        >
          <p>{currentLengthTA ? currentLengthTA.length : 0} /2000</p>
        </div>
      </div>
      <input
        className="rounded-md input border-base-300 hover:border-base-content duration-300 "
        placeholder="Marca do Produto"
        type="text"
        {...register("brand")}
      />
      {errors["brand"] && (
        <p className="text-error">{errors["brand"]?.message as string}</p>
      )}
    </>
  );
}
