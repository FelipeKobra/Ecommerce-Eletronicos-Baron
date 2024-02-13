import Image from "next/image";

import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <div className="grid grid-cols-7 mt-5 w-full h-[60svh] max-h-[40rem] text-center shadow-md rounded-sm bg-gradient-to-r from-sky-400 to-sky-600 ">
      <div className="col-span-7 xl:col-span-4 flex flex-col justify-center items-center select-none">
        <h1 className="text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-[4rem] ">
          Liquidação De Verão
        </h1>
        <h2 className="text-4xl my-5 text-white font-semibold">
          Aproveite os Descontos
        </h2>
        <p
          className={`text-4xl sm:text-5xl xl:text-6xl text-yellow-400 font-bold animate-pulse ${styles["text-glow-yellow"]}`}
        >
          ATÉ 50% DE DESCONTO
        </p>
      </div>

      <div className=" hidden xl:col-span-3 xl:flex  justify-center items-center ">
        <div className="relative w-full h-full max-h-[30rem] xl:h-5/6">
          <Image
            priority={true}
            src="https://firebasestorage.googleapis.com/v0/b/capstone-projects-409512.appspot.com/o/Images%2FBanner.png?alt=media&token=5fb289d8-c9b7-4a65-91b6-c5d1f046bedb"
            alt="Banner Image"
            fill
          />
        </div>
      </div>
    </div>
  );
}
