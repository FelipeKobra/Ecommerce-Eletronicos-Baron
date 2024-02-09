"use client";
import ImageIcon from "@mui/icons-material/Image";
import { getStorage } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 } from "uuid";



import ImageInput from "@/app/components/ImageInput";
import firebaseApp from "@/libs/firebase";
import { UserQueryResult } from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import handleUserImage from "./handleUserImage";


interface ImageChangeProps {
  user: UserQueryResult;
}

export default function ImageChange({ user }: ImageChangeProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  if (!user) return;

  let imagem =
    "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp";

  if (!user.image) user.image = imagem;

  let imagePath = `usuarios/${new Date().getTime() + "-" + v4()}`;
  if (user.imagePath) imagePath = user.imagePath;

  return (
    <div>
      <div
        onClick={() => {
          const element = document.getElementById(`modal_${user.id}`);
          if (element instanceof HTMLDialogElement) {
            element.showModal();
          }
        }}
      >
        <ImageIcon /> Trocar Imagem
      </div>
      <dialog className="modal cursor-default" id={`modal_${user.id}`}>
        <div className="modal-box flex flex-col gap-6 items-center">
          <div className="h-[18rem] w-[15rem] relative ">
            <Image
              className="rounded-full"
              src={user.image}
              alt={`${user.name} Imagem`}
              fill
            />
          </div>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleUserImage({
                  data: {
                    user_id: user.id,
                    image: imageFile as File,
                    imagePath: imagePath,
                  },
                  router,
                  storage,
                });
              }}
              className="flex flex-col items-center gap-6 max-w-[18rem]"
            >
              <div className="w-full  text-center">
                <ImageInput imageFile={imageFile} setImageFile={setImageFile} />
              </div>

              <button
                className="h-[3rem] w-full  mt-2 text-lg text-primary rounded-md border-2 border-primary hover:bg-primary hover:text-primary-content hover:animate-pulse duration-300"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
