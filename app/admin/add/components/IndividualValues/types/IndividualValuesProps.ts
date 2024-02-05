import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { AddForm } from "../../zodConfig/schemas";

export interface handleCheckedProps {
    individualStock: boolean;
    individualPrice: boolean;
    setIndividualStock: (value: boolean) => void;
    setIndividualPrice: (value: boolean) => void;
    register: UseFormRegister<AddForm>;
    setValue: UseFormSetValue<AddForm>;
    watch: UseFormWatch<AddForm>;
    errors: FieldErrors<AddForm>;
    maxPrice: number;
    maxStock: number;
    id: "price" | "quantity";
  }