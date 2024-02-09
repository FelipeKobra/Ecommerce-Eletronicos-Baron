
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

import AdminNavBar from "./components/AdminNavBar";

import NoData from "../components/NoData";

export const metadata = {
  title: "Baron Admin",
  description: "Admin Dashboard do Baron",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <NoData
        title="Acesso Não Autorizado"
        subtitle="Não se preocupe, vamos voltar às compras!"
        link="/"
      />
    );
  }

  return (
    <div>
      <AdminNavBar />
      {children}
    </div>
  );
}
