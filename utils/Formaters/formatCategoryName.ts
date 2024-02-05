export default function formatCategoryName(label: string) {
  if (label === "Geral") return label;

  if (label === "Celular" || label === "Computador") {
    return label + "es";
  } else {
    return label + "s";
  }
}
