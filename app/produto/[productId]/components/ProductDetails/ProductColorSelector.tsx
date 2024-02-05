import { v4 } from "uuid";

import { imagemProduto } from "@/utils/types/types";


interface ProductColorSelector {
  imagens: imagemProduto[];
  imageIndex: number;
  setImageIndex: (index: number) => void;
}

export default function ProductColorSelector({
  imagens,
  imageIndex,
  setImageIndex,
}: ProductColorSelector) {
  return (
    <>
      <p className="font-bold text-lg">Cores</p>
      {imagens.map((e, index: number) => {
        const nomeCor = e.color;
        const codigoCor = e.colorCode;
        return (
          <div key={v4()} className="tooltip" data-tip={nomeCor}>
            <button
              onClick={() => setImageIndex(index)}
              style={{ backgroundColor: `${codigoCor}` }}
              className={` w-[2rem] h-[2rem] border-solid border-4 ${
                index === imageIndex && "border-teal-400"
              }  rounded-full hover:border-base-content duration-200  `}
            />
          </div>
        );
      })}
    </>
  );
}
