import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center w-[70%] h-[80vh] mx-auto">
    <span className="w-[30%] loading loading-spinner"></span>
    </div>
  );
}
