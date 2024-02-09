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
      <p className={`w-10/12 max-h-[15rem] overflow-y-auto`}>{produto.description}</p>
      <HorizontalRuleDesc />
    </>
  );
}
