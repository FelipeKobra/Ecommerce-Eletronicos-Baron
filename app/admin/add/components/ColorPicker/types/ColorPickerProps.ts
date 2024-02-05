import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { AddForm, variableItemForm } from "../../zodConfig/schemas";




export default interface ColorPickerProps {
  maxPrice: number;
  maxStock: number;
  index: number;
  isProductCreated: boolean;
  individualPrice: boolean;
  individualStock: boolean;
  variable: variableItemForm;
  errors: FieldErrors<AddForm>;
  register: UseFormRegister<AddForm>;
  reset: UseFormReset<AddForm>;
  setValue: UseFormSetValue<AddForm>;
  watch: UseFormWatch<AddForm>;
}
