import { FieldErrors, UseFormRegister } from "react-hook-form";

import { signInSchemaType } from "../types/signInSchema";

interface FormInputLoginProps {
  type: string;
  placeholder: string;
  register: UseFormRegister<signInSchemaType>;
  errors: FieldErrors<signInSchemaType>;
  errorMessage: any;
  id: keyof signInSchemaType;
}

export default function FormInputLogin({
  type,
  placeholder,
  register,
  errors,
  errorMessage,
  id,
}: FormInputLoginProps) {
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
      {errors[id] && (
        <p className="text-error select-none text-xl font-semibold">
          {errorMessage}
        </p>
      )}
    </>
  );
}
