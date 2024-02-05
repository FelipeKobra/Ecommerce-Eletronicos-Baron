import { FieldErrors, UseFormRegister } from "react-hook-form";

import { AddForm } from "../../zodConfig/schemas";

interface IndividualPriceProps {
  globalPrice: number;
  maxPrice: number;
  errors: FieldErrors<AddForm>;
  register: UseFormRegister<AddForm>;
}

export default function IndividualPrice({
  globalPrice,
  maxPrice,
  errors,
  register,
}: IndividualPriceProps) {
  return (
    <>
      <input
        className="input input-bordered text-xl w-1/5"
        placeholder="Preço"
        type="number"
        {...register("globalPrice")}
      />
      <span>
        R$
        {new Intl.NumberFormat("pt-BR").format(globalPrice ? globalPrice : 0)}
      </span>
      {errors["globalPrice"] && (
        <p className="text-error">{errors["globalPrice"]?.message as string}</p>
      )}
      {globalPrice === maxPrice && (
        <p className="text-error">Limite de Preço atingido</p>
      )}
    </>
  );
}
