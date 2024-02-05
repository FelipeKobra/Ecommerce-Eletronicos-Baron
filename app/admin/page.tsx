
import getGraphData from "@/utils/interfaces/getPrismaItems/getGraphData";
import getOrders from "@/utils/interfaces/getPrismaItems/getOrders";
import getProducts from "@/utils/interfaces/getPrismaItems/getProducts";
import getUsers from "@/utils/interfaces/getPrismaItems/getUsers";

import BarGraph from "./components/BarGraph";
import Sumario from "./components/Sumario";

export default async function page() {
  try {
    const results = await Promise.all([
      getProducts({ category: null }),
      getOrders(),
      getUsers(),
      getGraphData(),
    ]);

    const produtos = results[0];
    const pedidos = results[1];
    const users = results[2];
    const graphData = results[3];

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
