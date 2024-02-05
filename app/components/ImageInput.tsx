"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface ImageInputProps {
  imageFile: File|null
  setImageFile: (file: File) => void;
}

export default function ImageInput(
  { imageFile, setImageFile }: ImageInputProps,
  props: any
) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles.length > 0 &&
        acceptedFiles[0].size <= 5 * 1024 * 1024
      ) {
        setImageFile(acceptedFiles[0]);
      } else {
        toast.error("Limite máximo de 5MB para cada imagem");
      }
    },
    [setImageFile]
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
        <input {...props} {...getInputProps()} />
        {isDragActive ? (
          <p>Arraste a Imagem aqui...</p>
        ) : (
          <p>Adicione sua imagem aqui! </p>
        )}
      </div>
      {imageFile && (
        <p className="font-medium text-md select-none">{imageFile.name}</p>
      )}
    </div>
  );
}
