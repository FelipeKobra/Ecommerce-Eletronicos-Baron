import removeBackground from "@imgly/background-removal";
import axios from "axios";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
} from "firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

import {
  handleImageAPIData,
  handleImageProps,
} from "../types/handleImageProps";

export interface handleImageParams {
  removeBg: boolean;
  storage: FirebaseStorage;
  data: handleImageProps;
  router: AppRouterInstance;
}

export default async function handleImage({
  removeBg,
  storage,
  data,
  router,
}: handleImageParams) {
  if (!data.image) {
    return toast.error("Escolha uma imagem");
  }

  try {
    toast("Imagem sendo Alterada, aguarde!");

    let noBgImage: Blob | null = null;
    if (removeBg) {
      noBgImage = await removeBackground(data.image);
    }

    const finalImage = noBgImage ? noBgImage : data.image;

    const storageRef = ref(storage, data.imagePath);
    await uploadBytes(storageRef, finalImage);
    const imageURL = await getDownloadURL(storageRef);

    const sendData: handleImageAPIData = {
      imageURL,
      variableId: data.variableId,
    };

    await axios.put("/api/products/edit", sendData);
    toast.success("Imagem Alterada");
    router.refresh();
  } catch (error) {
    console.error(error);
  }
}
