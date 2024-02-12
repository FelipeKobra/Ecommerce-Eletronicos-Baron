import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import AddMenu from "./AddMenu";

export default async function page() {
  const user = await getCurrentUser();

  if (user)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <AddMenu />
      </div>
    );
}
