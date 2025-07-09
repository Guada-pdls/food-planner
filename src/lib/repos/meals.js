import { prisma } from '../prisma'
import calculateMacros from '@/lib/calculations/calculateMacros'
import { getSuggestedRecipes } from './recipes'
import sumRecipeNutrition from '../calculations/sumRecipeNutrition'
import { parseISODate } from '@/utils/date'
import { generateMealDays } from '../planning/generateMealDays'
import { toISODate } from '@/utils/date';

// Función para generar las comidas de un solo día
export async function generateDailyMeals(
    dayObj,
    userId,
    macroGoals,
    enrichedRecipes,
    selectedMeals,
    dayIndex
) {
    const MEAL_SLOTS = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];
    const date = new Date(dayObj.iso);

    // LIMPIAR meals al inicio para evitar duplicados
    dayObj.meals = [];

    const getMacroValue = (val) => val?.estimated ?? val?.min;

    // Objetivo total para el día
    const totalTargets = {
        calories: getMacroValue(macroGoals.calories),
        protein: getMacroValue(macroGoals.protein),
        carbs: getMacroValue(macroGoals.carbohydrates),
        fats: getMacroValue(macroGoals.fat),
    };

    // Distribución de calorías por tipo de comida (percentajes aproximados)
    const MEAL_DISTRIBUTION = {
        'Desayuno': 0.25,   // 25%
        'Almuerzo': 0.35,   // 35%
        'Merienda': 0.15,   // 15%
        'Cena': 0.25        // 25%
    };

    const persistedMeals = [];
    const errors = [];
    const totalConsumed = { calories: 0, protein: 0, carbs: 0, fats: 0 };

    // Función para calcular qué tan bien se ajusta una receta al objetivo
    const calculateRecipeScore = (recipe, targetMacros) => {
        const n = recipe.nutrition;

        // Penalizar recetas que sean demasiado grandes o pequeñas
        const calorieRatio = n.calories / targetMacros.calories;
        if (calorieRatio > 3 || calorieRatio < 0.1) return Infinity;

        // Calcular diferencias normalizadas
        const calorieDiff = Math.abs(n.calories - targetMacros.calories) / targetMacros.calories;
        const proteinDiff = Math.abs(n.protein - targetMacros.protein) / Math.max(targetMacros.protein, 1);
        const carbsDiff = Math.abs(n.carbs - targetMacros.carbs) / Math.max(targetMacros.carbs, 1);
        const fatsDiff = Math.abs(n.fats - targetMacros.fats) / Math.max(targetMacros.fats, 1);

        // Peso mayor a las calorías y proteínas
        return calorieDiff * 2 + proteinDiff * 1.5 + carbsDiff + fatsDiff;
    };

    // Función para calcular la porción óptima usando múltiples macros
    const calculateOptimalPortion = (recipe, targetMacros) => {
        const n = recipe.nutrition;

        // Calcular porciones basadas en cada macro
        const portions = {
            calories: targetMacros.calories / n.calories,
            protein: targetMacros.protein / n.protein,
            carbs: targetMacros.carbs / n.carbs,
            fats: targetMacros.fats / n.fats
        };

        // Usar la porción de calorías como base, pero ajustar si otros macros son críticos
        let optimalPortion = portions.calories;

        // Si la proteína es muy baja comparada con el objetivo, priorizar proteína
        if (portions.protein > portions.calories * 1.5) {
            optimalPortion = Math.min(portions.protein, portions.calories * 1.3);
        }

        // Limitar a rangos realistas
        return Math.max(0.3, Math.min(optimalPortion, 3.0));
    };

    // NUEVA FUNCIÓN: Seleccionar receta con variedad
    const selectRecipeWithVariety = (pool, targetMacros, usedRecipes = new Set()) => {
        // Filtrar recetas ya usadas para evitar repetición
        const availablePool = pool.filter(r => !usedRecipes.has(r.recipe_id));
        const finalPool = availablePool.length > 0 ? availablePool : pool;

        // Calcular scores para todas las recetas
        const scoredRecipes = finalPool.map(recipe => ({
            recipe,
            score: calculateRecipeScore(recipe, targetMacros)
        })).filter(item => item.score !== Infinity);

        if (scoredRecipes.length === 0) return null;

        // Ordenar por score (mejor primero)
        scoredRecipes.sort((a, b) => a.score - b.score);

        // Seleccionar entre las mejores opciones con algo de randomización
        const topCount = Math.min(5, scoredRecipes.length); // Top 5 o menos
        const topRecipes = scoredRecipes.slice(0, topCount);

        // Usar weighted random selection - mejores scores tienen más probabilidad
        const weights = topRecipes.map((_, index) =>
            Math.pow(0.7, index) // Peso decreciente exponencial
        );

        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        const random = Math.random() * totalWeight;

        let cumulativeWeight = 0;
        for (let i = 0; i < topRecipes.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return topRecipes[i].recipe;
            }
        }

        // Fallback
        return topRecipes[0].recipe;
    };

    // Conjunto para rastrear recetas usadas en este día
    const usedRecipesThisDay = new Set();

    for (let i = 0; i < MEAL_SLOTS.length; i++) {
        const type = MEAL_SLOTS[i];

        // Calcular objetivo para esta comida específica
        const mealTarget = {
            calories: totalTargets.calories * MEAL_DISTRIBUTION[type],
            protein: totalTargets.protein * MEAL_DISTRIBUTION[type],
            carbs: totalTargets.carbs * MEAL_DISTRIBUTION[type],
            fats: totalTargets.fats * MEAL_DISTRIBUTION[type],
        };

        // Ajustar objetivo basado en lo que ya se ha consumido
        const remaining = {
            calories: Math.max(0, totalTargets.calories - totalConsumed.calories),
            protein: Math.max(0, totalTargets.protein - totalConsumed.protein),
            carbs: Math.max(0, totalTargets.carbs - totalConsumed.carbs),
            fats: Math.max(0, totalTargets.fats - totalConsumed.fats),
        };

        // Si quedan pocas calorías, usar el objetivo ajustado
        const mealsLeft = MEAL_SLOTS.length - i;
        if (remaining.calories < mealTarget.calories && mealsLeft > 0) {
            mealTarget.calories = remaining.calories / mealsLeft;
            mealTarget.protein = remaining.protein / mealsLeft;
            mealTarget.carbs = remaining.carbs / mealsLeft;
            mealTarget.fats = remaining.fats / mealsLeft;
        }

        let pool = enrichedRecipes.filter((r) =>
            r.types.some((t) => t.type === type)
        );

        // Agregar comidas especiales
        if (dayIndex === 0 && type === 'Almuerzo') {
            pool = pool.concat(selectedMeals.get('leg'));
        }
        if (dayIndex === 6 && type === 'Cena') {
            pool = pool.concat(selectedMeals.get('fish'));
        }

        // Filtrar recetas válidas
        pool = pool.filter((r) => {
            const n = r.nutrition;
            return (
                n.calories > 0 &&
                n.protein > 0 &&
                n.carbs >= 0 &&
                n.fats >= 0 &&
                n.calories <= mealTarget.calories * 4 && // Más flexible
                n.calories >= mealTarget.calories * 0.1    // Mínimo razonable
            );
        });

        if (!pool.length) {
            console.warn(`No se encontró comida válida para ${type} del ${dayObj.iso}`);
            continue;
        }

        // USAR LA NUEVA FUNCIÓN DE SELECCIÓN CON VARIEDAD
        const choice = selectRecipeWithVariety(pool, mealTarget, usedRecipesThisDay);

        if (!choice) {
            console.warn(`No se pudo seleccionar receta para ${type} del ${dayObj.iso}`);
            continue;
        }

        // Agregar a recetas usadas
        usedRecipesThisDay.add(choice.recipe_id);

        const n = choice.nutrition;

        // Calcular porción óptima
        const portion = calculateOptimalPortion(choice, mealTarget);

        // Actualizar totales consumidos
        totalConsumed.calories += n.calories * portion;
        totalConsumed.protein += n.protein * portion;
        totalConsumed.carbs += n.carbs * portion;
        totalConsumed.fats += n.fats * portion;

        // Crear mealData con información completa para debugging
        const mealData = {
            ...choice,
            portion,
            date,
            type,
            // Agregar información nutricional calculada para debugging
            calculatedNutrition: {
                calories: n.calories * portion,
                protein: n.protein * portion,
                carbs: n.carbs * portion,
                fats: n.fats * portion
            }
        };

        // Guardar meal data
        const slotKey = `${dayObj.iso}_${type}`;
        if (!selectedMeals.has(slotKey)) selectedMeals.set(slotKey, []);
        selectedMeals.get(slotKey).push(mealData);
        dayObj.meals.push(mealData);

        try {
            // Verificar si ya existe una comida para este día y tipo
            const existingMeal = await prisma.meal.findFirst({
                where: { date, type, users: { some: { id: userId } } },
                include: { recipes: true },
            });

            if (existingMeal) {

                // Limpiar recetas existentes si es necesario
                await prisma.mealRecipe.deleteMany({
                    where: { meal_id: existingMeal.id }
                });

                // Agregar nueva receta
                await prisma.meal.update({
                    where: { id: existingMeal.id },
                    data: {
                        recipes: {
                            create: {
                                recipe_id: choice.recipe_id,
                                portion,
                            },
                        },
                    },
                });
                persistedMeals.push({ ...existingMeal, updated: true });
            } else {
                const created = await prisma.meal.create({
                    data: {
                        date,
                        type,
                        users: {
                            create: [{ user: { connect: { id: userId } } }],
                        },
                        recipes: {
                            create: {
                                recipe_id: choice.recipe_id,
                                portion,
                            },
                        },
                    },
                    include: {
                        recipes: {
                            include: {
                                recipe: {
                                    select: {
                                        recipe_id: true,
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                });
                persistedMeals.push(created);
            }
        } catch (err) {
            console.error(`Error al guardar ${type} del ${dayObj.iso}:`, err);
            errors.push({ date: dayObj.iso, type, message: err.message });
        }
    }

    // Verificar si necesitamos ajustes finales
    const finalTotal = dayObj.meals.reduce(
        (acc, m) => {
            const calories = m.nutrition.calories * m.portion;
            const protein = m.nutrition.protein * m.portion;
            const carbs = m.nutrition.carbs * m.portion;
            const fats = m.nutrition.fats * m.portion;

            acc.calories += calories;
            acc.protein += protein;
            acc.carbs += carbs;
            acc.fats += fats;
            return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    dayObj.meals.forEach((meal, idx) => {
        const cal = meal.nutrition.calories * meal.portion;
    });

    return { persistedMeals, errors, total: finalTotal };
}

// Función principal para generar plan por múltiples días
export async function generateWeeklyPlan(startDate, userId, macros, daysCount = 7) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { weight: true, gender: true, physical_activity: true }
        });

        if (!user) throw new Error(`Usuario ${userId} no encontrado`);

        const macroGoals = calculateMacros(
            macros.calories.estimated,
            user.gender,
            user.weight,
            user.physical_activity
        );

        const recs = await getSuggestedRecipes(userId);
        const enriched = recs.map(r => ({ ...r, nutrition: sumRecipeNutrition(r) }));

        // Seleccionar comidas especiales (legumbres y pescados)
        const legMeals = enriched.filter(r =>
            r.ingredients.some(ri => ri.ingredient.category === 'Legumbres')
        );
        const fishMeals = enriched.filter(r =>
            r.ingredients.some(ri => ri.ingredient.category === 'Pescados')
        );

        if (legMeals.length === 0 || fishMeals.length === 0) {
            throw new Error('Faltan recetas de legumbres o pescados en sugerencias');
        }

        const selectedMeals = new Map();
        selectedMeals.set('leg', [legMeals[0]]);
        selectedMeals.set('fish', [fishMeals[0]]);

        const allPersistedMeals = [];
        const allErrors = [];

        // Generar días según la cantidad especificada
        const days = generateMealDays(toISODate(new Date(startDate)), daysCount);

        // Generar comidas para cada día y enriquecer los días con la información de las comidas
        const enrichedDays = [];

        for (const [i, dayObj] of days.entries()) {
            const result = await generateDailyMeals(
                dayObj,
                userId,
                macroGoals,
                enriched,
                selectedMeals,
                i
            );

            allPersistedMeals.push(...result.persistedMeals);
            allErrors.push(...result.errors);

            // Enriquecer el día con la información de las comidas creadas
            // Agrupar por meal_id para crear el formato correcto
            const mealsMap = new Map();

            result.persistedMeals.forEach(meal => {
                const mealId = meal.recipes[0].meal_id;

                if (!mealsMap.has(mealId)) {
                    mealsMap.set(mealId, {
                        meal_id: mealId,
                        date: dayObj.date, // asumiendo que dayObj tiene la fecha
                        type: meal.type,
                        recipes: []
                    });
                }

                // Agregar cada receta al meal correspondiente
                mealsMap.get(mealId).recipes.push({
                    meal_id: mealId,
                    recipe_id: meal.recipes[0].recipe_id,
                    portion: meal.recipes[0].portion || 1, // si no viene portion, usar 1
                    recipe: meal.recipes[0].recipe
                });
            });

            const enrichedDay = {
                ...dayObj,
                meals: Array.from(mealsMap.values())
            };

            enrichedDays.push(enrichedDay);
        }

        return {
            ok: true,
            created: allPersistedMeals.length,
            skipped: allErrors.length,
            days: enrichedDays, // Ahora devuelve los días enriquecidos con la info de las comidas
            errors: allErrors
        };
    } catch (err) {
        console.error('Error al generar el plan:', err);
        return {
            ok: false,
            message: err.message,
            days: [],
            errors: [err.message]
        };
    }
}

export async function getMealsByDate(userId, iso) {
    const start = parseISODate(iso);
    start.setUTCHours(0, 0, 0, 0);

    const end = parseISODate(iso);
    end.setUTCHours(23, 59, 59, 999);

    let found = await prisma.meal.findMany({
        where: {
            date: {
                gte: start,
                lte: end
            },
            users: {
                some: { id: userId }
            }
        },
        include: {
            recipes: {
                include: {
                    recipe: {
                        include: {
                            nutrition_info: {
                                include: {
                                    info: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: { type: 'asc' }
    });

    return found
}

export async function getMealsByDateRange(userId, startISO, numDays = 7) {
    // Generar la estructura de días base
    const days = generateMealDays(startISO, numDays);

    // Calcular rango de fechas para la consulta
    const startDate = parseISODate(startISO);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = parseISODate(startISO);
    endDate.setDate(endDate.getDate() + numDays - 1);
    endDate.setUTCHours(23, 59, 59, 999);

    // Obtener todas las comidas en el rango de fechas
    const meals = await prisma.meal.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate
            },
            users: {
                some: { id: userId }
            }
        },
        include: {
            recipes: {
                include: {
                    recipe: {
                        include: {
                            nutrition_info: {
                                include: {
                                    info: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: [
            { date: 'asc' },
            { type: 'asc' }
        ]
    });

    // Mapear comidas a sus días correspondientes
    const mealsByIso = new Map();

    meals.forEach(meal => {
        const mealISO = toISODate(meal.date);

        if (!mealsByIso.has(mealISO)) {
            mealsByIso.set(mealISO, []);
        }

        mealsByIso.get(mealISO).push(meal);
    });

    // Asignar comidas a cada día en la estructura
    days.forEach(day => {
        if (mealsByIso.has(day.iso)) {
            day.meals = mealsByIso.get(day.iso);
        }
        // Si no hay comidas para ese día, meals ya está como array vacío
    });

    return days;
}

export async function deleteMealById(meal_id) {
    return prisma.$transaction(async (prisma) => {
        // Eliminar las relaciones UserMeal
        await prisma.userMeal.deleteMany({
            where: {
                meal_id: meal_id
            }
        });

        // Eliminar las relaciones MealRecipe
        await prisma.mealRecipe.deleteMany({
            where: {
                meal_id: meal_id
            }
        });

        // Finalmente eliminar el meal
        return prisma.meal.delete({
            where: {
                meal_id: meal_id
            }
        });
    });
}

export async function deleteMealsByWeek(userId, startISO) {
    const days = generateMealDays(startISO, 7);
    const meals = await prisma.meal.findMany({
        where: {
            date: {
                gte: parseISODate(days[0].iso),
                lte: parseISODate(days[days.length - 1].iso)
            },
            users: {
                some: { id: userId }
            }
        },
        select: { meal_id: true }
    });

    for (const meal of meals) {
        await deleteMealById(meal.meal_id);
    }

    return { deleted: meals.length };
}