import moment from "moment";

import prisma from "@/libs/prismaDb";

import "moment/locale/pt-br";

export default async function getGraphData() {
  try {
    //Pegar as datas de início e fim do data Range
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    //Pegar as informações da DB da última semana e somar os valores
    const result = await prisma.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "Realizado",
      },
      _sum: { amount: true },
    });

    const formatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    const currentDate = startDate.clone();

    while (currentDate <= endDate) {
      const day = currentDate.locale('pt-br').format("dddd");

      formatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      currentDate.add(1, "day");
    }

    result.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd");
      const amount = entry._sum.amount || 0;
      formatedData[day].totalAmount += amount;
    });

    const finalData = Object.values(formatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return finalData;
  } catch (error: any) {
    throw new Error(error);
  }
}
