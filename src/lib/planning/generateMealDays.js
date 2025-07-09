import { toISODate } from "@/utils/date"

export function generateMealDays(startISO, numDays = 7) {
  const days = []
  const base = new Date(startISO)

  for (let i = 0; i < numDays; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)

    days.push({
      iso: toISODate(d),
      date: d.toLocaleDateString('es-ES'),
      name: d.toLocaleDateString('es-ES', { weekday: 'long' }),
      meals: []
    })
  }

  return days
}
