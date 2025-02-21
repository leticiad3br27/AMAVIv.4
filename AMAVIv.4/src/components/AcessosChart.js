"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AcessosChart = () => {
  const acessos = [5, 10, 15, 30, 40, 50, 70, 90, 100, 120];

  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Acessos Mensais",
        data: acessos,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
    ],
  };

  return (
    <div>
      <h3>Gráfico de Acessos</h3>
      <Line data={data} />
    </div>
  );
};

export default AcessosChart;
