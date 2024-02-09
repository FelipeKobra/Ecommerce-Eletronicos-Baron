import { variaveis } from "./types/variaveis";

interface ProductColorSelector {
  variaveis: variaveis[];
  imageIndex: number;
  setImageIndex: (index: number) => void;
}

export default function ProductColorSelector({
  variaveis,
  imageIndex,
  setImageIndex,
}: ProductColorSelector) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-bold text-lg">Cores</p>
      {variaveis.map((variavel, index: number) => {
        const nomeCor = variavel.color;
        const codigoCor = variavel.colorCode;
        return (
          <div key={variavel.id} className="tooltip" data-tip={nomeCor}>
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
    </div>
  );
}
