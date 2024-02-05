"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

import { AddForm } from "../../zodConfig/schemas";




interface SelectImageProps {
  index: number;
  register: UseFormRegister<AddForm>;
  handleFileChanger: (value: File) => void;
}

export default function SelectImage({
  handleFileChanger,
  register,
  index,
}: SelectImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles.length > 0 &&
        acceptedFiles[0].size <= 5 * 1024 * 1024
      ) {
        handleFileChanger(acceptedFiles[0]);
      } else {
        toast.error("Limite máximo de 5MB para cada imagem");
      }
    },
    [handleFileChanger]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="my-4 p-2 rounded-md border-2 border-primary border-dashed cursor-pointer text-md font-normal text-base-content bg-base-100  hover:scale-105 duration-300"
      >
        <input {...getInputProps()} {...register(`variables.${index}.image`)} />
        {isDragActive ? (
          <p>Arraste a Imagem aqui...</p>
        ) : (
          <p>Adicione sua imagem aqui! </p>
        )}
      </div>
      <p className="text-error text-lg">Imagem é Obrigatória</p>
    </div>
  );
}
