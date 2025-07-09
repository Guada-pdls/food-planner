import { toISODate } from "@/utils/date"

export function generateMealDays(startISO, numDays) {
  const days = [];
  // Aseguramos que la fecha se interprete como local para evitar problemas de zona horaria
  const currentDate = new Date(startISO + 'T00:00:00');
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  for (let i = 0; i < numDays; i++) {
    days.push({
      iso: toISODate(currentDate), // Formato YYYY-MM-DD
      name: dayNames[currentDate.getDay()],
      meals: [], // Se llenará después
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}