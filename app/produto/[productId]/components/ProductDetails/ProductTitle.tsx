import { PascalName } from "@/utils/Formaters/formatName";
import formatPrice from "@/utils/Formaters/formatPrice";

interface ProductTitle {
  name: string;
  price: number;
}

export default function ProductTitle({ name, price }: ProductTitle) {
  return (
    <>
      <h1 className="text-4xl font-semibold">{PascalName(name)}</h1>
      <h2 className="text-4xl font-semibold">{formatPrice(price)}</h2>
    </>
  );
}
