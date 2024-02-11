import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import LoginForm from "./components/LoginForm";


export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-center items-end h-[120svh] sm:h-[115svh] mb-10">
      <LoginForm currentUser={currentUser} />
    </div>
  );
}
