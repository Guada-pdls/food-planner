import NutritionInfo from "../NutitionInfo/NutritionInfo";
import NutritionInfoComparison from "../NutitionInfo/NutritionInfoComparison";

const DayDetail = ({ meals }) => {
    let total = {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        fiber: 0
    };

    for (const meal of meals) {
        total.calories += meal.nutrition_info.calories;
        total.carbohydrates += meal.nutrition_info.carbohydrates;
        total.fat += meal.nutrition_info.fat;
        total.protein += meal.nutrition_info.protein;
        total.fiber += meal.nutrition_info.fiber;
    }
    
    return (
        <>
            {meals.length > 0 ? (
                meals.map((meal, index) => (
                    <div key={index} className="meal-detail">
                        <h2 className="subtitle">{meal.type}</h2>
                        <h3 className="subtitle2">{meal.name}</h3>
                        <div className="nutrition-info">
                            <NutritionInfo {...meal.nutrition_info} />
                        </div>
                    </div>  
                ))
            ) : (
                <div className="no-meals">
                    <h2>No hay comidas registradas para este día.</h2>
                </div>
            )}
            <h2 className="subtitle">Totales del día</h2>
            <NutritionInfoComparison {...total}  />
        </>
    )
}

export default DayDetail