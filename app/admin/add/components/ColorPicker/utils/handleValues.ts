import { variableItemForm } from "../../zodConfig/schemas";


interface handleValuesProps {
  price: number;
  maxPrice: number;
  quantity: number;
  maxStock: number;
  colorPickerSetValue: (name: keyof variableItemForm, value: any) => void;
}

export default function handleValues({
  price,
  maxPrice,
  quantity,
  maxStock,
  colorPickerSetValue,
}: handleValuesProps) {
  if (price > maxPrice) {
    colorPickerSetValue("price", maxPrice);
  }
  if (!price || price < 0) {
    colorPickerSetValue("price", "");
  }

  if (quantity > maxStock) {
    colorPickerSetValue("stock", maxStock);
  }

  if (!quantity || quantity < 0) {
    colorPickerSetValue("stock", "");
  }
}
