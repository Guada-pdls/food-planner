"use client";

import calculateCaloriesWithFAO from "@/lib/calculations/calculateCaloriesWithFAO";
import calculateMacros from "@/lib/calculations/calculateMacros";
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

const chartOptions = (title) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
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

const VerticalBarChart = ({ consumedMacros, userData }) => {
  const recommendedCalories = calculateCaloriesWithFAO(
    userData.weight,
    userData.height,
    userData.age,
    userData.gender,
    userData.physical_activity
  );
  const recommendedMacros = calculateMacros(
    recommendedCalories,
    userData.gender,
    userData.weight,
    userData.physical_activity
  );

  const macroData = [
    {
      name: "Carbohidratos",
      value: Math.round(recommendedMacros.carbohydrates.estimated),
      comparisonValue: Math.round(consumedMacros.carbohydrates),
      color: "rgba(255, 99, 132, 0.4)",
      compColor: "rgba(255, 99, 132, 1)",
      border: "rgba(255, 99, 132, 1)",
    },
    {
      name: "Grasas",
      value: Math.round(recommendedMacros.fat.estimated),
      comparisonValue: Math.round(consumedMacros.fat),
      color: "rgba(255, 206, 86, 0.4)",
      compColor: "rgba(255, 206, 86, 1)",
      border: "rgba(255, 206, 86, 1)",
    },
    {
      name: "Proteínas",
      value: Math.round(recommendedMacros.protein.estimated),
      comparisonValue: Math.round(consumedMacros.protein),
      color: "rgba(54, 162, 235, 0.4)",
      compColor: "rgba(54, 162, 235, 1)",
      border: "rgba(54, 162, 235, 1)",
    },
    {
      name: "Fibra",
      value: Math.round(recommendedMacros.fiber.estimated),
      comparisonValue: Math.round(consumedMacros.fiber),
      color: "rgba(75, 192, 192, 0.4)",
      compColor: "rgba(75, 192, 192, 1)",
      border: "rgba(75, 192, 192, 1)",
    },
    {
      name: "Calorías",
      value: Math.round(recommendedCalories),
      comparisonValue: Math.round(consumedMacros.calories),
      color: "rgba(153, 102, 255, 0.4)",
      compColor: "rgba(153, 102, 255, 1)",
      border: "rgba(153, 102, 255, 1)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
      {macroData.map((macro) => {
        const data = {
          labels: [macro.name],
          datasets: [
            {
              label: "Consumido",
              data: [macro.comparisonValue],
              backgroundColor: macro.compColor,
              borderColor: macro.border,
              borderWidth: 1,
            },
            {
              label: "Recomendado",
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
            className="h-[300px] shadow rounded-xl p-4"
          >
            <Bar data={data} options={chartOptions(macro.name)} />
          </div>
        );
      })}
    </div>
  );
};

export default VerticalBarChart;