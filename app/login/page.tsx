import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import LoginForm from "./components/LoginForm";


export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-center items-end h-[110svh]">
      <LoginForm currentUser={currentUser} />
    </div>
  );
}
