import { removeBackground } from "@imgly/background-removal";

const removesBackground = async (image: File | null) => {
  if (image) {
    return await removeBackground(image);
  }
};

export default async function backgroundRemover(imageArray: (File | null)[]) {
  try {
    if (imageArray) {
      const promises = imageArray.map((image) => removesBackground(image));
      const result = await Promise.all(promises);

      return result;
    }
  } catch (error) {
    console.error("Error processing images:", error);
  }
}
