import {
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { AddForm } from "./zodConfig/schemas";



interface RemoveImageBgProps {
  watch: UseFormWatch<AddForm>;
  register: UseFormRegister<AddForm>;
}

export default function RemoveImageBg({
  watch,
  register,
}: RemoveImageBgProps) {
  const bgRemoveBoolean = watch("removeBg");

  return (
    <div className=" flex flex-col gap-4 items-center justify-center">
      <p className="text-xl">Remover Fundo de Todas as imagens?</p>
      <input
        className="checkbox checkbox-primary"
        type="checkbox"
        {...register("removeBg")}
        id="Remove_image_background"
      />
      <p className="text-sm text-base-content opacity-50">
        {" "}
        Deixa o processo de envio mais lento
      </p>
    </div>
  );
}
