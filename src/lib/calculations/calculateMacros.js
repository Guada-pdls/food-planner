const calculateMacros = (calories, gender, weight, physical_activity) => {
    console.log(calories)
    const macros = {
        carbohydrates: parseInt(calories) * 0.35 / 4, // 35% of calories from carbohydrates
        protein: physical_activity === 'Mínima' ?  weight * 0.8 : // depending on physical activity level
        physical_activity === 'Baja' ? weight * 1.0 : 
        physical_activity === 'Moderada' ? weight * 1.3 :
        weight * 1.6, 
        fat: parseInt(calories) * 0.25 / 9, // 25% of calories from
        fiber: gender === 'Mujer' ? 28.5 : 32.5, // Recommended fiber intake
        calories: calories
    }
    return macros;
}

export default calculateMacros;