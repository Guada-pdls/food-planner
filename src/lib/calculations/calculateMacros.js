const calculateMacros = (calories, gender, weight, physical_activity) => {
  const parsedCalories = parseInt(calories);

  const activityLevel = physical_activity == 'Mínima' ? 1.2 : 
  physical_activity == 'Baja' ? 1.53 :
  physical_activity == 'Moderada' ? 1.76 : 2.25;

  // Cálculo de proteínas (fijo según nivel de actividad)
  const proteinPerKg = {
    'Mínima': 0.8,
    'Baja': 1.0,
    'Moderada': 1.3,
    'Intensa': 1.6
  };
  const protein = weight * activityLevel; 
  console.log(activityLevel)

  // Fibra mínima y máxima según género
  const fiberRange = gender === 'Mujer' ? { min: 25, max: 32 } : { min: 30, max: 35 };

  const macros = {
    calories: {
      min: parsedCalories - 500, 
      estimated: parsedCalories,
      max: parsedCalories + 500
    },

    carbohydrates: {
      min: (parsedCalories * 0.30) / 4,
      estimated: (parsedCalories * 0.35) / 4,
      max: (parsedCalories * 0.40) / 4,
    },

    fat: {
      min: (parsedCalories * 0.20) / 9, // 20% de calorías
      estimated: (parsedCalories * 0.25) / 9, // 25% de calorías
      max: (parsedCalories * 0.30) / 9, // 30% de calorías
    },

    protein: {
      min: (parsedCalories * 0.13 / 4), // 13% de calorías
      estimated: protein, // gramos según actividad
      max: (parsedCalories * 0.24 / 4), // 24% de calorías
    },

    fiber: {
      min: fiberRange.min,
      estimated: (fiberRange.min + fiberRange.max) / 2, // valor medio como referencia
      max: fiberRange.max,
    }
  };

  return macros;
};

export default calculateMacros;
