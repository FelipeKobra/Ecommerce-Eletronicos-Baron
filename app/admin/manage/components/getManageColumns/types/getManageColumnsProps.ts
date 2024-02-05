import { FirebaseStorage } from "firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { handleImageParams } from "../../../utils/handleImage";

export interface getManageColumnsProps {
  router: AppRouterInstance;
  storage: FirebaseStorage;
  imageFile: File | null;
  removeBg: boolean;
  setRemoveBg: (value: boolean) => void;
  setImageFile: (file: File | null) => void;
  handleDelete(id: string, router: AppRouterInstance): Promise<void>;
  handleStock(
    id: string,
    isSelling: boolean,
    router: AppRouterInstance
  ): Promise<void>;
  handleImage({
    removeBg,
    storage,
    data,
    router,
  }: handleImageParams): Promise<string | undefined>;
}
