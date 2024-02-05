import { FieldErrors, UseFormRegister } from "react-hook-form";

import { AddForm } from "../../../AddMenu";


interface IndividualPriceProps {
  index: number;
  price: number;
  maxPrice: number;
  errors: FieldErrors<AddForm>;
  register: UseFormRegister<AddForm>;
}

export default function IndividualPrice({
  index,
  price,
  maxPrice,
  errors,
  register,
}: IndividualPriceProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-10 pt-6 text-xl">
      <div className="flex w-3/4 flex-col items-center justify-center gap-4">
        <hr className="w-full opacity-50" />
        <p>Preço</p>
        <input
          className="input w-full input-bordered focus:outline-base-content focus:border-base-300 duration-100"
          type="number"
          placeholder="Preço"
          {...register(`variables.${index}.price`)}
        />
        <span>
          R$ {new Intl.NumberFormat("pt-BR").format(price ? price : 0)}
        </span>

        {errors.variables?.[index]?.price && (
          <p className="text-error">
            {errors.variables?.[index]?.price?.message}
          </p>
        )}
        {price === maxPrice && (
          <p className="text-error">Limite de Preço atingido</p>
        )}
        <hr className="w-full opacity-50" />
      </div>
    </div>
  );
}
