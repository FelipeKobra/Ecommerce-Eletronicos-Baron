import { FieldErrors, UseFormRegister } from "react-hook-form";

import { signUpSchemaType } from "../types/signUpSchema";

interface FormInput {
  type: string;
  placeholder: string;
  register: UseFormRegister<signUpSchemaType>;
  errors: FieldErrors<signUpSchemaType>;
  errorMessage: any;
  id: keyof signUpSchemaType;
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
      {errors[id] && (
        <p className="text-error select-none text-xl font-semibold">
          {errorMessage}
        </p>
      )}
    </>
  );
}
