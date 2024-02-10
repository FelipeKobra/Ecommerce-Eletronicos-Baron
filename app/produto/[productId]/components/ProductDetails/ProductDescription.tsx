import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

import HorizontalRuleDesc from "./HorizontalRuleDesc";


export default function ProductDescription({
  produto,
}: {
  produto: ProductArrayType[0];
}) {
  return (
    <>
      <HorizontalRuleDesc />
      <p className={`w-full px-4 md:px-0 border-x-2 md:border-x-0 border-opacity-40 md:w-10/12 max-h-[15rem] overflow-y-auto`}>{produto.description}</p>
      <HorizontalRuleDesc />
    </>
  );
}
