'use client'

import { useState, useMemo } from "react";
import NutritionInfo from "../NutitionInfo/NutritionInfo";
import NutritionInfoComparison from "../NutitionInfo/NutritionInfoComparison";
import RecipeOptions from "./RecipeOptions";

// 1. Definimos las categorías y su orden fuera del componente.
const MEAL_TYPES = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];

const DayDetail = ({ meals: initialMeals, user }) => {
    const [meals, setMeals] = useState(initialMeals);

    // Función para manejar la eliminación de un meal
    const handleMealDelete = (deletedMealId) => {
        setMeals(prevMeals => prevMeals.filter(meal => meal.meal_id !== deletedMealId));
    };

    // 2. Usamos useMemo para que totals se recalcule cuando meals cambie
    const totals = useMemo(() => {
        return meals.reduce((acc, meal) => {
            console.log(meal)
            const { portion } = meal.recipes[0];
            meal.recipes.forEach(r => {
                const nutrition = r.recipe?.nutrition_info?.info;
                if (nutrition) {
                    // Usamos '|| 0' como defensa para no sumar valores nulos o undefined.
                    acc.calories += (nutrition.calories || 0) * portion;
                    acc.carbohydrates += (nutrition.carbs || 0) * portion;
                    acc.fat += (nutrition.fats || 0) * portion;
                    acc.protein += (nutrition.protein || 0) * portion;
                    acc.fiber += (nutrition.fiber || 0) * portion;
                }
            });
            return acc;
        }, { calories: 0, carbohydrates: 0, fat: 0, protein: 0, fiber: 0 });
    }, [meals]); // Se recalcula cuando meals cambia

    // 3. También usamos useMemo para groupedMeals para optimizar
    const groupedMeals = useMemo(() => {
        return meals.reduce((acc, meal) => {
            const type = meal.type || 'Otros'; // Agrupamos comidas sin tipo en 'Otros'
            if (!acc[type]) {
                acc[type] = []; // Si la categoría no existe en el objeto, la creamos
            }
            acc[type].push(meal); // Agregamos la comida a su categoría
            return acc;
        }, {});
    }, [meals]);

    return (
        <>
            {meals.length > 0 ? (
                // 4. Mapeamos sobre nuestro orden de categorías, no sobre el array de comidas.
                MEAL_TYPES.map(mealType => {
                    const mealsForType = groupedMeals[mealType];

                    // Si no hay comidas para esta categoría, no renderizamos nada.
                    if (!mealsForType || mealsForType.length === 0) {
                        return null;
                    }

                    return (
                        <div key={mealType} className="meal-category">
                            <h2 className="subtitle">{mealType}</h2>
                            {mealsForType.map((meal, mealIndex) => (
                                <div key={mealIndex} className="meal-detail">
                                    {meal.recipes.map((r, recipeIndex) => {
                                        const { recipe } = r;
                                        const { portion } = meal.recipes[0];
                                        const nutrition = recipe?.nutrition_info?.info;

                                        if (!nutrition) return null;

                                        const scaled = {
                                            calories: (nutrition.calories || 0) * portion,
                                            carbohydrates: (nutrition.carbs || 0) * portion,
                                            fat: (nutrition.fats || 0) * portion,
                                            protein: (nutrition.protein || 0) * portion,
                                            fiber: (nutrition.fiber || 0) * portion
                                        };

                                        return (
                                            <article key={recipeIndex} className="recipe-detail overflow-x-scroll">
                                                <RecipeOptions
                                                    {...recipe}
                                                    meal_id={meal.meal_id}
                                                    onDelete={handleMealDelete}
                                                />
                                                <NutritionInfo {...scaled} />
                                            </article>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    );
                })
            ) : (
                <div className="no-meals">
                    <h2 className="px-4">No hay comidas registradas para este día.</h2>
                </div>
            )}

            <h2 className="subtitle">Totales del día</h2>
            <NutritionInfoComparison {...totals} user={user} />
        </>
    );
};

export default DayDetail;