"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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
  const { data: session, status } = useSession();
  const [macroData, setMacroData] = useState([]);

  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      const recommendedCalories = calculateCaloriesWithFAO(
        user.weight, 
        user.height, 
        user.age, 
        user.gender, 
        user.physical_activity
      );
      const recommendedMacros = calculateMacros(
        recommendedCalories, 
        user.gender, 
        user.weight, 
        user.physical_activity
      );
      
      console.log(recommendedMacros);
      
      // Actualizar los datos de macros con los valores calculados
      const updatedMacroData = [
        {
          name: "Carbohidratos",
          value: Math.round(recommendedMacros.carbohydrates.estimated),
          color: "rgba(255, 99, 132, 0.6)",
          border: "rgba(255, 99, 132, 1)",
        },
        {
          name: "Grasas",
          value: Math.round(recommendedMacros.fat.estimated),
          color: "rgba(255, 206, 86, 0.6)",
          border: "rgba(255, 206, 86, 1)",
        },
        {
          name: "Proteínas",
          value: Math.round(recommendedMacros.protein.estimated),
          color: "rgba(54, 162, 235, 0.6)",
          border: "rgba(54, 162, 235, 1)",
        },
        {
          name: "Fibra",
          value: Math.round(recommendedMacros.fiber.estimated), // Si no tienes fibra calculada, usa valor por defecto
          color: "rgba(75, 192, 192, 0.6)",
          border: "rgba(75, 192, 192, 1)",
        },
        {
          name: "Calorías",
          value: Math.round(recommendedCalories),
          color: "rgba(153, 102, 255, 0.6)",
          border: "rgba(153, 102, 255, 1)",
          
        },
      ];
      
      setMacroData(updatedMacroData);
    }
  }, [session]);

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Por favor, inicia sesión para ver tus datos nutricionales.</div>;
  }

  if (macroData.length === 0) {
    return <div>Cargando datos nutricionales...</div>;
  }

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