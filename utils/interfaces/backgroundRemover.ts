import imglyRemoveBackground from "@imgly/background-removal";

const removeBackground = async (image: File | null) => {
  if (image) {
    return await imglyRemoveBackground(image);
  }
};

export default async function backgroundRemover(imageArray: (File | null)[]) {
  try {
    if (imageArray) {
      const promises = imageArray.map((image) => removeBackground(image));
      const result = await Promise.all(promises);

      return result;
    }
  } catch (error) {
    console.error("Error processing images:", error);
  }
}
