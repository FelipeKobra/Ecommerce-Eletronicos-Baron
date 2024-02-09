import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import RegisterForm from "./components/RegisterForm";


export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-center items-end  h-[130svh]">
      <RegisterForm currentUser={currentUser} />
    </div>
  );
}
