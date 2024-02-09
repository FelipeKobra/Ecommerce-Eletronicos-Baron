import { FirebaseStorage } from "firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";

import ImageInput from "@/app/components/ImageInput";

import { handleImageParams } from "../../../utils/handleImage";


interface ManageImageProps {
  router: AppRouterInstance;
  storage: FirebaseStorage;
  imageFile: File | null;
  removeBg: boolean;
  params: any,
  setImageFile: (file: File | null) => void;
  setRemoveBg: (value: boolean) => void;
  handleImage({
    removeBg,
    storage,
    data,
    router,
  }: handleImageParams): Promise<string | undefined>;
}

export default function ManageImage({
  router,
  storage,
  params,
  removeBg,
  imageFile,
  handleImage,
  setRemoveBg,
  setImageFile,
}: ManageImageProps) {
  return (
    <div className="h-[45px] w-[40px] relative">
      <Image
        fill
        id={params.row.variable_id}
        src={params.row.image}
        alt={`${params.row.name} Imagem`}
        className="cursor-pointer"
        onClick={() => {
          const element = document.getElementById(
            `modal_${params.row.variable_id}`
          );
          if (element instanceof HTMLDialogElement) {
            element.showModal();
          }
        }}
      />
      <dialog className="modal" id={`modal_${params.row.variable_id}`}>
        <div className="modal-box flex flex-col gap-6 items-center">
          <div className="h-[18rem] w-[15rem] relative">
            <Image
              src={params.row.image}
              alt={`${params.row.name} Imagem`}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleImage({
                  data: {
                    image: imageFile as File,
                    imagePath: params.row.imagePath,
                    removeBg: removeBg,
                    variableId: params.row.variable_id,
                  },
                  removeBg,
                  router,
                  storage,
                });
              }}
              className="flex flex-col gap-6"
            >
              <ImageInput imageFile={imageFile} setImageFile={setImageFile} />
              <div className="flex flex-col gap-2">
                <p className="text-lg">Remover Plano de Fundo ?</p>
                <input
                  onChange={() => setRemoveBg(!removeBg)}
                  checked={removeBg}
                  className="checkbox checkbox-primary self-center"
                  type="checkbox"
                  name="remove-bg"
                />
              </div>

              <button
                className="h-[3rem] mt-2 text-lg text-primary rounded-md border-2 border-primary hover:bg-primary hover:text-primary-content hover:animate-pulse duration-300"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setRemoveBg(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
}
