import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddForm } from "../../zodConfig/schemas";

interface IndividualStockProps {
  index: number;
  quantity: number;
  maxStock: number;
  errors: FieldErrors<AddForm>;
  register: UseFormRegister<AddForm>;
}

export default function IndividualStock({
  index,
  quantity,
  maxStock,
  errors,
  register,
}: IndividualStockProps) {
  return (
    <div className="flex w-3/4 flex-col items-center justify-center gap-4">
      <p>Quantidade no Estoque</p>
      <input
        className="input w-full input-bordered focus:outline-base-content focus:border-base-300 duration-100"
        type="number"
        placeholder="Quantidade no Estoque"
        {...register(`variables.${index}.stock`)}
      />
      {errors.variables?.[index]?.stock && (
        <p className="text-error">
          {errors.variables?.[index]?.stock?.message}
        </p>
      )}
      {quantity === maxStock && (
        <p className="text-error">Limite de Quantidade atingido</p>
      )}
      <hr className="w-full opacity-50" />
    </div>
  );
}
