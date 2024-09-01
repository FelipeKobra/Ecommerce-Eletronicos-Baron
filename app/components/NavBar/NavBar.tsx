import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import LogoText from "./Components/LogoText";
import NavCategories from "./Components/NavCategories";
import SearchInput from "./Components/SearchInput";
import ShoppingCart from "./Components/ShoppingCart";
import ThemeSelector from "./Components/ThemeSelector";
import UserAvatar from "./Components/UserAvatar";

import "/app/globals.css";
import { Suspense } from "react";

export default async function NavBar() {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full bg-base-300 text-base-content shadow-sm min-h-20">
      <div className="flex min-h-20 justify-between items-center">
        <div className="w-1/4 xl:w-1/3">
          <LogoText />
        </div>

        <div className=" hidden w-1/2 md:flex xl:w-1/3 justify-center items-center h-[3.5rem]">
          <Suspense
            fallback={
              <div className="skeleton hidden w-1/2 md:flex xl:w-1/3 justify-center items-center h-[3.5rem]"></div>
            }
          >
            <SearchInput />
          </Suspense>
        </div>

        <div className="flex w-1/4 xl:w-1/3 flex-nowrap justify-end items-center gap-10 xl:gap-16 pr-10">
          <div className="block md:hidden lg:block lg:mr-[-2rem]">
            <ThemeSelector />
          </div>

          <ShoppingCart />
          <UserAvatar currentUser={currentUser} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="hidden md:block lg:hidden self-end mr-9 mb-3">
          <ThemeSelector />
        </div>

        <div className="w-10/12 my-4 mx-auto px-2 flex md:hidden justify-center items-center h-[3.5rem]">
          <Suspense
            fallback={
              <div className="skeleton w-10/12 my-4 mx-auto px-2 flex md:hidden justify-center items-center h-[3.5rem]"></div>
            }
          >
            <SearchInput />
          </Suspense>
        </div>

        <Suspense fallback={<div className="skeleton w-full h-[40px]"></div>}>
          <NavCategories />
        </Suspense>
      </div>
    </div>
  );
}
