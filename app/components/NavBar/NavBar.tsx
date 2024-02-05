import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import LogoIcon from "./Components/LogoText";
import SearchInput from "./Components/SearchInput";
import ShoppingCart from "./Components/ShoppingCart";
import ThemeSelector from "./Components/ThemeSelector";
import UserAvatar from "./Components/UserAvatar";
import "/app/globals.css";
import NavCategories from "./Components/NavCategories";

export default async function NavBar() {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full bg-base-300 text-base-content shadow-sm min-h-20">
      <div className="row min-h-20 justify-between items-center">
        <div className="w-1/3">
          <LogoIcon />
        </div>

        <div className="flex w-1/3 justify-center items-center h-[3.5rem]">
          <SearchInput />
        </div>

        <div className="flex  flex-nowrap justify-end items-center w-1/3 pr-10">
          <ThemeSelector />
          <ShoppingCart />
          <UserAvatar currentUser={currentUser} />
        </div>
      </div>
      <NavCategories />
    </div>
  );
}
