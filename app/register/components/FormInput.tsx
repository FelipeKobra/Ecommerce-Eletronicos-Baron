import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FormInput {
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  errorMessage: any;
  id: string;
}

export default function FormInput({
  type,
  placeholder,
  register,
  errors,
  errorMessage,
  id,
}: FormInput) {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full input input-lg input-bordered focus:border-base-content focus:outline-none ${
          errorMessage && "input-error"
        }`}
        {...register(`${id}`)}
      />
      {errors[id] && <p className="text-error select-none text-xl font-semibold">{errorMessage}</p>}
    </>
  );
}
