'use client';
import CalendarWeekTable from "@/Components/Calendar/CalendarWeekTable";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { generateMealDays } from "@/lib/planning/generateMealDays";
import calculateMacros from "@/lib/calculations/calculateMacros";
import calculateCaloriesWithFAO from "@/lib/calculations/calculateCaloriesWithFAO";
import { formatDate, formatDateDDMM, toISODate } from "@/utils/date";

const getWeekRange = (refDate) => {
  const startDate = new Date(refDate)
  const day = refDate.getDay()
  const diff = (day === 0 ? -6 : 1) - day // lunes como primer día

  startDate.setDate(refDate.getDate() + diff)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  return {
    start: toISODate(startDate),
    end: toISODate(endDate)
  }
}

export default function Page() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [week, setWeek] = useState([]);
  const [weekRange, setWeekRange] = useState(() => getWeekRange(new Date()));

  const fetchMeals = async (start) => {
    setLoading(true);
    const macros = calculateMacros(
      calculateCaloriesWithFAO(
        session.user.weight,
        session.user.height,
        session.user.age,
        session.user.gender,
        session.user.physical_activity
      )
    );

    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startOfWeek: start,
          userId: session.user.id,
          macros,
          numDays: 7,
        }),
      });
      const data = await res.json();
      setWeek(data.meals);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setWeek(generateMealDays(weekRange.start, 7));
  }, [weekRange]);

  const changeWeek = (deltaDays) => {
    const newDate = new Date(weekRange.start);
    newDate.setDate(newDate.getDate() + deltaDays);
    setWeekRange(getWeekRange(newDate));
  };

  const startDate = new Date(weekRange.start);
  const endDate = new Date(weekRange.end);

  return (
    <main className="pb-20 w-full">
      <header>
        <h1 className="title">Calendario de Comidas</h1>
        <nav className="flex justify-between items-center w-full max-w-3xl px-4 pb-2">
          <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => changeWeek(-7)} />
          <div>
            <p className="text-2xl font-semibold px-4">
              {startDate.toLocaleDateString("es-UY", { month: "long" })} {startDate.getFullYear()}
            </p>
            <p className="text-sm text-center">
              Semana {formatDate(weekRange.start)} - {formatDate(weekRange.end)}
            </p>
          </div>
          <FaArrowRight className="text-2xl cursor-pointer" onClick={() => changeWeek(7)} />
        </nav>
      </header>

      <CalendarWeekTable days={week} />

      <div className="flex justify-center py-4 bg-base-300">
        <button
          className="btn btn-wide btn-circle btn-secondary"
          onClick={() => fetchMeals(weekRange.start)}
        >
          {loading ? "Generando..." : "Generar automáticamente"}
        </button>
      </div>
    </main>
  );
}
