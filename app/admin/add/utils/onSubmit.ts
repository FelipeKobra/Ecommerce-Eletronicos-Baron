import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import firebaseApp from "@/libs/firebase";
import { PascalName } from "@/utils/Formaters/formatName";
import backgroundRemover from "@/utils/interfaces/backgroundRemover";

import { AddForm } from "../components/zodConfig/schemas";

interface onSubmitProps {
  data: AddForm;
  individualPrice: boolean;
  individualStock: boolean;
  setIsLoading: (value: boolean) => void;
  setIsCreated: (value: boolean) => void;
}

export default async function onSubmit({
  data,
  individualPrice,
  individualStock,
  setIsLoading,
  setIsCreated,
}: onSubmitProps) {
  setIsLoading(true);

  let imageURLIndex = 0;

  if (!data.category) {
    setIsLoading(false);
    return toast.error("Categoria Não Selecionada", { id: data.name });
  }

  if (!individualPrice) {
    data.variables.forEach((variable) => (variable.price = data.globalPrice));
  }
  if (!individualStock) {
    data.variables.forEach((variable) => (variable.stock = data.globalStock));
  }

  const imageFiles = data.variables
    .map((item) => item.image)
    .filter((image) => image !== null);
  let noBgImageFiles: (Blob | undefined)[] | undefined = undefined;

  if (
    !imageFiles.length ||
    imageFiles.length !==
      data.variables.filter((variable) => variable.isChosen === true).length
  ) {
    setIsLoading(false);
    return toast.error("Adicione todas as Imagens", { id: data.name });
  }

  async function handleImageUploads() {
    toast("Criando o produto, aguarde...", { id: data.name });

    if (data.removeBg) {
      noBgImageFiles = await backgroundRemover(imageFiles);
    }

    try {
      for (const image of noBgImageFiles ? noBgImageFiles : imageFiles) {
        if (image) {
          const fileName = new Date().getTime() + "-" + v4();
          const storage = getStorage(firebaseApp);
          const storageRef = ref(storage, `produtos/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, image, {
            customMetadata: { path: `produtos/${fileName}` },
          });

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                console.log("Ocorreu um erro no upload da imagem", error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    data.variables[imageURLIndex].imageURL = downloadURL;
                    data.variables[imageURLIndex].imagePath =
                      `produtos/${fileName}`;
                    imageURLIndex++;
                    resolve();
                  })
                  .catch((error) => {
                    console.log(error);
                    reject(error);
                  });
              }
            );
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Erro ao realizar a conversão das imagens", error);
      return toast.error("Erro ao realizar a conversão das imagens" + error, {
        id: data.name,
      });
    }
  }

  function formatData() {
    data.variables = data.variables.filter(
      (variable) => variable.isChosen === true
    );

    data.name = PascalName(data.name);
  }

  formatData();
  await handleImageUploads();

  try {
    await axios.post("/api/products", data);
    setIsCreated(true);
    toast.success("Produto Criado com sucesso");
  } catch (error) {
    toast.error("Houve um erro durante o envio da imagem para a DB");
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}
