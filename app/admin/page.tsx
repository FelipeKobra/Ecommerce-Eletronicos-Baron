import getGraphData from "@/utils/interfaces/getPrismaItems/getGraphData";
import getOrders from "@/utils/interfaces/getPrismaItems/getOrders";
import getProducts from "@/utils/interfaces/getPrismaItems/getProducts";
import getUsers from "@/utils/interfaces/getPrismaItems/getUsers";

import BarGraph from "./components/BarGraph";
import Sumario from "./components/Sumario";
import getCurrentUser from "@/utils/interfaces/getPrismaItems/getCurrentUser";

export default async function page() {
  try {
    const [produtos, pedidos, users, graphData, user] = await Promise.all([
      getProducts({ category: null }),
      getOrders(),
      getUsers(),
      getGraphData(),
      getCurrentUser(),
    ]);

    if (user?.role === "ADMIN")
      return (
        <div className="w-10/12 mx-auto">
          <Sumario pedidos={pedidos} produtos={produtos} users={users} />
          <BarGraph data={graphData} />
        </div>
      );
  } catch (error) {
    console.error("Error occured ", error);
  }
}
