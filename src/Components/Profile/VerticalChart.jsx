"use client";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const macroData = [
  {
    name: "Carbohidratos",
    value: 250,
    color: "rgba(255, 99, 132, 0.6)",
    border: "rgba(255, 99, 132, 1)",
  },
  {
    name: "Grasas",
    value: 90,
    color: "rgba(255, 206, 86, 0.6)",
    border: "rgba(255, 206, 86, 1)",
  },
  {
    name: "Proteínas",
    value: 120,
    color: "rgba(54, 162, 235, 0.6)",
    border: "rgba(54, 162, 235, 1)",
  },
  {
    name: "Fibra",
    value: 35,
    color: "rgba(75, 192, 192, 0.6)",
    border: "rgba(75, 192, 192, 1)",
  },
  {
    name: "Calorías",
    value: 2000,
    color: "rgba(153, 102, 255, 0.6)",
    border: "rgba(153, 102, 255, 1)",
  },
];

const chartOptions = (title) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: title,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const VerticalBarChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {macroData.map((macro) => {
        const data = {
          labels: [macro.name],
          datasets: [
            {
              label: macro.name,
              data: [macro.value],
              backgroundColor: macro.color,
              borderColor: macro.border,
              borderWidth: 1,
            },
          ],
        };

        return (
          <div
            key={macro.name}
            className="h-[300px] bg-white shadow rounded-xl p-4"
          >
            <Bar data={data} options={chartOptions(macro.name)} />
          </div>
        );
      })}
    </div>
  );
};

export default VerticalBarChart;
