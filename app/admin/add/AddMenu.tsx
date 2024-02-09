"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";


import { categories } from "@/data/categories";

import AddFormButton from "./components/AddFormButton";
import FormInputs from "./components/AddFormInputs";
import CategoriesCard from "./components/CategoriesCard";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import IndividualValues from "./components/IndividualValues/IndividualValues";
import RemoveImageBg from "./components/RemoveImageBg";
import { schema, AddForm } from "./components/zodConfig/schemas";
import { variables } from "./data/variables";
import onSubmit from "./utils/onSubmitAdd";



export const maxPrice = 1000000;
export const maxStock = 1000;

export default function AddMenu() {
  //Router Config
  const router = useRouter();

  //States
  const [isCreated, setIsCreated] = useState(false);
  const [individualPrice, setIndividualPrice] = useState(true);
  const [individualStock, setIndividualStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //Form Config
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<AddForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { variables: variables },
  });

  const { fields } = useFieldArray({ control, name: "variables" });

  //Form Submit
  async function handleOnSubmit(data: AddForm) {
    await onSubmit({
      data,
      individualPrice,
      individualStock,
      setIsCreated,
      setIsLoading,
    });
  }

  //Reseta tudo após criação dos produtos
  useEffect(() => {
    if (isCreated) {
      reset();
      setIsCreated(false);
      router.refresh();
      window.scrollTo(0, 0);
    }
  }, [isCreated, reset, router]);

  //Watch Events
  const category = watch("category");
  const currentLengthTA = watch("description");

  return (
    <div className="w-11/12 md:w-10/12 xl:w-3/5 my-[3rem]">
      <form
        className="flex flex-col shadow-2xl rounded-xl my-4   py-8 px-[2rem] md:px-[5rem] gap-5 "
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <FormInputs
          currentLengthTA={currentLengthTA}
          errors={errors}
          register={register}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ label, Icon }) => {
            return (
              <CategoriesCard
                key={label}
                category={category}
                label={label}
                Icon={Icon}
                changeSelected={() => setValue("category", label)}
              />
            );
          })}
        </div>
        {errors["category"] && (
          <p className="text-error text-center">
            {errors["category"]?.message as string}
          </p>
        )}
        <div className="flex flex-col items-center justify-center gap-6 my-4 text-xl">
          <p>Preços individuais para cada cor?</p>
          <IndividualValues
            maxPrice={maxPrice}
            maxStock={maxStock}
            setValue={setValue}
            watch={watch}
            id="price"
            errors={errors}
            individualPrice={individualPrice}
            individualStock={individualStock}
            register={register}
            setIndividualPrice={setIndividualPrice}
            setIndividualStock={setIndividualStock}
          />
          <p>Quantidades individuais para cada cor?</p>
          <IndividualValues
            maxPrice={maxPrice}
            maxStock={maxStock}
            setValue={setValue}
            watch={watch}
            id="quantity"
            errors={errors}
            individualPrice={individualPrice}
            individualStock={individualStock}
            register={register}
            setIndividualPrice={setIndividualPrice}
            setIndividualStock={setIndividualStock}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6">
          {fields.map((field, index) => (
            <div key={index}>
              <ColorPicker
                maxPrice={maxPrice}
                maxStock={maxStock}
                errors={errors}
                register={register}
                reset={reset}
                index={index}
                watch={watch}
                setValue={setValue}
                variable={field}
                individualPrice={individualPrice}
                individualStock={individualStock}
                isProductCreated={isCreated}
              />
            </div>
          ))}
        </div>
        <p className="text-error w-full text-center">
          {errors.variables && errors.variables.message}
        </p>
        <RemoveImageBg watch={watch} register={register} />
        <AddFormButton isLoading={isLoading} />
      </form>
    </div>
  );
}
