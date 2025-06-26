/**
 * Calcula las calorías diarias estimadas según la fórmula FAO (2010).
 * 
 * @param weight Peso en kilogramos
 * @param height Altura en centímetros
 * @param age Edad en años
 * @param gender "Masculino" | "Femenino"
 * @param activityLevel Nivel de actividad física (multiplicador)
 * @returns Calorías estimadas por día (TDEE)
 */
export default function calculateCaloriesWithFAO(
  weight,
  height,
  age,
  gender,
  activityLevel
) {
  if (weight <= 0 || height <= 0 || age <= 0 || activityLevel <= 0) {
    throw new Error('Parámetros inválidos: todos los valores deben ser mayores que cero.')
  }

  const heightInMeters = height / 100
  let tmb

  if (gender === 'Masculino') {
    if (age >= 10 && age <= 18) {
      tmb = 16.6 * weight + 77 * heightInMeters + 572
    } else if (age >= 19 && age <= 30) {
      tmb = 15.4 * weight + 27 * heightInMeters + 717
    } else if (age >= 31 && age <= 60) {
      tmb = 11.3 * weight + 16 * heightInMeters + 901
    } else {
      throw new Error('Edad fuera de rango válido para hombres (10–60 años).')
    }
  } else if (gender === 'Femenino') {
    if (age >= 10 && age <= 18) {
      tmb = 7.4 * weight + 482 * heightInMeters + 217
    } else if (age >= 19 && age <= 30) {
      tmb = 13.3 * weight + 334 * heightInMeters + 35
    } else if (age >= 31 && age <= 60) {
      tmb = 8.7 * weight - 25 * heightInMeters + 865
    } else {
      throw new Error('Edad fuera de rango válido para mujeres (10–60 años).')
    }
  } else {
    throw new Error(`Género no reconocido: "${gender}". Use "Masculino" o "Femenino".`)
  }

  return tmb * activityLevel
}
