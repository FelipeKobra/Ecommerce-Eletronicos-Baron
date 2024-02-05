interface handleValuesProps {
  globalPrice: number;
  maxPrice: number;
  globalStock: number;
  maxStock: number;
  customSetValue: (name: "globalPrice" | "globalStock", value: any) => void;
}

export default function handleValues({
  globalPrice,
  maxPrice,
  globalStock,
  maxStock,
  customSetValue,
}: handleValuesProps) {
  if (globalPrice > maxPrice) {
    customSetValue("globalPrice", maxPrice);
  }
  if (!globalPrice || globalPrice < 0) {
    customSetValue("globalPrice", "");
  }

  if (globalStock > maxStock) {
    customSetValue("globalStock", maxStock);
  }

  if (!globalStock || globalStock < 0) {
    customSetValue("globalStock", "");
  }
}
