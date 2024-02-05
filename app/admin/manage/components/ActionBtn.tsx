import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function ActionBtn({
  icon: Icon,
  onClick,
  disabled,
}: ActionBtnProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px]   h-[30px] text-base-content border  ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
    >
      <Icon size={18} />
    </button>
  );
}
