import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import RegisterForm from "./components/RegisterForm";


export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-center items-end my-20  ">
      <RegisterForm currentUser={currentUser} />
    </div>
  );
}
