import { variableItemForm } from "../../zodConfig/schemas";

interface CancelImageProps {
  File: File | null;
  setFile: (file: File | null) => void;
  colorPickerSetValue: (name: keyof variableItemForm, value: any) => void;
}

export default function CancelImage({
  File,
  setFile,
  colorPickerSetValue,
}: CancelImageProps) {
  return (
    <div className="py-4 flex flex-col items-center justify-center gap-4">
      <button
        className="btn btn-outline text-md"
        onClick={() => {
          setFile(null);
          colorPickerSetValue("image", null);
        }}
      >
        Cancelar Imagem
      </button>
      <p>{File && File.name}</p>
    </div>
  );
}
