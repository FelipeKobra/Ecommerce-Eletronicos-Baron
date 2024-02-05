import { FieldErrors, UseFormRegister } from "react-hook-form";

import { AddForm } from "../../zodConfig/schemas";


interface IndividualStockProps {
    globalStock: number;
    maxStock: number;
    errors: FieldErrors<AddForm>;
    register: UseFormRegister<AddForm>;
  }

export default function IndividualStock({globalStock,maxStock,errors,register}:IndividualStockProps) {
  return (
    <>
          <input
            className="input input-bordered text-xl w-2/12"
            placeholder="0"
            type="number"
            {...register("globalStock")}
          />
          {errors["globalStock"] && (
            <p className="text-error">
              {errors["globalStock"]?.message as string}
            </p>
          )}
          {globalStock === maxStock && (
            <p className="text-error">Limite de Quantidade atingido</p>
          )}
        </>
  )
}
