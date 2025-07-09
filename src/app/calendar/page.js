'use client';
import CalendarWeekTable from "@/Components/Calendar/CalendarWeekTable";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import calculateMacros from "@/lib/calculations/calculateMacros";
import calculateCaloriesWithFAO from "@/lib/calculations/calculateCaloriesWithFAO";
import { formatDate } from "@/utils/date";
import { generateMealDays } from "@/lib/planning/generateMealDays";

function getWeekRange(refDate) {
  // Crea una nueva fecha para no modificar la original.
  const date = new Date(refDate);

  // Obtiene el día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado).
  const day = date.getDay();

  // Calcula el lunes de esa semana.
  // Si el día es Domingo (0), retrocede 6 días. Si no, retrocede (día - 1) días.
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(date.setDate(diff));

  // Calcula el domingo de esa semana sumando 6 días al lunes.
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  // Formatea las fechas a ISO (YYYY-MM-DD).
  const startISO = start.toISOString().split('T')[0];
  const endISO = end.toISOString().split('T')[0];

  return {
    start: startISO,
    end: endISO,
  };
}

export default function Page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [week, setWeek] = useState([]);
  const [weekRange, setWeekRange] = useState(() => getWeekRange(new Date()));

  const fetchMeals = async (start) => {
    await deleteMeals(session.user.id, start)
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
      if (res.ok && data.meals && data.meals.days) {
        setWeek(data.meals.days);
      } else {
        alert("Hubo un error inesperado"); // TODO: handle error more gracefully
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteMeals = async (userId, startISO) => {
    setLoadingDelete(true);
    try {
      const res = await fetch("/api/meals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          startOfWeek: startISO,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setWeek(generateMealDays(startISO, 7))
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error inesperado"); 
    } finally {
      setLoadingDelete(false);
    }
  };


  const getMeals = async (userId, startISO) => {
      const params = new URLSearchParams({
        userId,
        startISO,
        numDays: '7'
      })

      const res = await fetch(`/api/meals?${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })

      const data = await res.json()
      if (data.ok) {
        setWeek(data.meals.days)
      } else {
        alert("Hubo un error inesperado") // TODO: Implement user-friendly error display or logging
      }
    }

    useEffect(() => {
      if (status === "loading") return;
      getMeals(session.user.id, weekRange.start, 7)
    }, [weekRange, status]);

    const changeWeek = (deltaDays) => {
      const newDate = new Date(weekRange.start + 'T00:00:00');
      newDate.setDate(newDate.getDate() + deltaDays);
      setWeekRange(getWeekRange(newDate));
    };

    const startDate = new Date(weekRange.start + 'T00:00:00');
    const endDate = new Date(weekRange.end + 'T00:00:00');

    return (
      <main className="pb-20 w-full">
        <header>
          <h1 className="title">Calendario de Comidas</h1>
          <nav className="flex justify-between items-center w-full max-w-3xl px-4 pb-2">
            <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => changeWeek(-7)} />
            <div>
              <p className="text-2xl font-semibold px-4 text-center">
                {startDate.toLocaleDateString("es-UY", { month: "long" })} {startDate.getFullYear()}
              </p>
              <p className="text-sm text-center">
                Semana {formatDate(startDate)} - {formatDate(endDate)}
              </p>
            </div>
            <FaArrowRight className="text-2xl cursor-pointer" onClick={() => changeWeek(7)} />
          </nav>
        </header>

        <CalendarWeekTable days={week} />

        <div className="flex justify-center py-4 bg-base-300">
          <button
            className="btn w-1/4 btn-circle btn-error me-2"
            onClick={() => deleteMeals(session.user.id, weekRange.start)}
          >
            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </button>
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
