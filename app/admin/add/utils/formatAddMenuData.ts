import { PascalName } from "@/utils/Formaters/formatName";
import { AddForm } from "../components/zodConfig/schemas";

export default function formatData(data: AddForm) {
  data.variables = data.variables.filter(
    (variable) => variable.isChosen === true
  );

  data.name = PascalName(data.name);
}
