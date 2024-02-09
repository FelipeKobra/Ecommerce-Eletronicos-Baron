import axios from "axios";
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

interface UserImageProps {
  user_id: string;
  image: File;
  imagePath: string;
}

interface handleImageParams {
  storage: FirebaseStorage;
  data: UserImageProps;
  router: AppRouterInstance;
}

export default async function handleUserImage({
  storage,
  data,
  router,
}: handleImageParams) {
  if (!data.image) {
    return toast.error("Escolha uma imagem");
  }

  try {
    toast("Imagem sendo Alterada, aguarde!");

    const storageRef = ref(storage, data.imagePath);
    await uploadBytes(storageRef, data.image);
    const imageURL = await getDownloadURL(storageRef);

    const sendData = {
      user_id: data.user_id,
      imagePath: data.imagePath,
      imageURL,
    };

    await axios.put("/api/user/image", sendData);
    toast.success("Imagem Alterada");
    router.refresh();
  } catch (error) {
    console.error(error);
  }
}
