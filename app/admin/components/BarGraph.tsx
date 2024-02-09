"use client";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GraphData[];
}

interface GraphData {
  day: string;
  date: string;
  totalAmount: number;
}

export default function BarGraph({ data }: BarGraphProps) {
  const labels = data.map((item) => item.day);
  const dayLabels = data.map((item) => item.date);
  const amounts = data.map((item) => item.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Ganho Diário",
        data: amounts,
        backgroundColor: "#4A00FFcc",
        borderColor: "#D1DBFF",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: { y: { beginAtZero: true } },
  };

  return <Bar className="my-10" data={chartData} options={options}></Bar>;
}
