import { PascalName } from "@/utils/Formaters/formatName";
import formatPrice from "@/utils/Formaters/formatPrice";

interface ProductTitle {
  name: string;
  price: number;
}

export default function ProductTitle({ name, price }: ProductTitle) {
  return (
    <>
      <h1 className={`text-3xl font-semibold w-10/12 ${name.length > 25 && 'text-xl'}`}>{PascalName(name)}</h1>
      <h2 className={`text-3xl font-semibold ${name.length > 25 && 'text-xl'}`}>{formatPrice(price)}</h2>
    </>
  );
}
