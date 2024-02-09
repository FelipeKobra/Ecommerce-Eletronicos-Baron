import React from "react";

export default function ManageColor({ params }: { params: any }) {
  return (
    <div className="flex gap-2 w-full h-full">
      <p className="self-center text-start flex-1">{params.row.color}</p>
      <div
        style={{ backgroundColor: `${params.row.colorCode}` }}
        className="w-[30px] h-[30px] relative right-0  self-center rounded-full border-2 border-base-content "
      ></div>
    </div>
  );
}
