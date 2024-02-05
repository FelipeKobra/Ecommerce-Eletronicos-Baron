import { IconType } from "react-icons";

interface CategoriesCardProps {
  label: string;
  category: string;
  changeSelected: () => void;
  Icon: IconType;
}

export default function CategoriesCard({
  label,
  category,
  changeSelected,
  Icon,
}: CategoriesCardProps) {
  if (label === "Geral") {
    return;
  }

  return (
    <div
      onClick={changeSelected}
      id={label}
      className={`z-1 select-none bg-base-100 rounded-md grid grid-rows-2 gap-4 p-4 justify-center items-center text-center cursor-pointer  border-solid border-2 hover:border-base-content duration-150 ${
        label === category ? "border-primary" : "border-base-200"
      }`}
    >
      <div
        id={label}
        className={`flex justify-center items-center
      `}
      >
        <Icon id={label} size={50} />
      </div>

      <p id={label} className="text-xl">
        {label}
      </p>
    </div>
  );
}
