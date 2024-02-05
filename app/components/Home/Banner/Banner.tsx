import Image from "next/image";

import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <div className="grid grid-cols-5 mt-5 w-full h-[25rem] shadow-md rounded-sm bg-gradient-to-r from-sky-400 to-sky-600 ">
      <div className="col-span-3 flex flex-col justify-center items-center select-none">
        <h1 className="text-7xl text-white font-bold">Liquidação De Verão</h1>
        <h2 className="text-5xl my-5 text-white font-semibold">
          Aproveite os Descontos
        </h2>
        <p
          className={`text-6xl text-yellow-400 font-bold animate-pulse ${styles["text-glow-yellow"]}`}
        >
          ATÉ 50% DE DESCONTO
        </p>
      </div>

      <div className="col-span-2 flex justify-center items-center ">
        <div className="relative w-full h-5/6">
          <Image
            className="mx-auto"
            priority={true}
            src='https://firebasestorage.googleapis.com/v0/b/capstone-projects-409512.appspot.com/o/Images%2FBanner.png?alt=media&token=5fb289d8-c9b7-4a65-91b6-c5d1f046bedb'
            alt="Banner Image"
            fill
          />
        </div>
      </div>
    </div>
  );
}
