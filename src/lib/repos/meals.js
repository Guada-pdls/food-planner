import { prisma } from '../prisma'
import calculateMacros from '@/lib/calculations/calculateMacros'
import { getSuggestedRecipes } from './recipes'
import sumRecipeNutrition from '../calculations/sumRecipeNutrition'
import { parseISODate } from '@/utils/date'

export async function generateWeeklyPlan(startDate, userId, macros) {
    function addDays(date, days) {
        const d = new Date(date)
        d.setDate(d.getDate() + days)
        return d
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { weight: true, gender: true, physical_activity: true }
    })
    const macroGoals = calculateMacros(macros.calories.estimated, user.gender, user.weight, user.physical_activity)

    const recs = await getSuggestedRecipes(userId)
    const enriched = recs.map(r => ({ ...r, nutrition: sumRecipeNutrition(r) }))

    // Filtrar legumbres y pescados:
    const legMeals = enriched.filter(r => r.ingredients.some(ri =>
        ri.ingredient.category === 'Legumbres'))
    const fishMeals = enriched.filter(r => r.ingredients.some(ri =>
        ri.ingredient.category === 'Pescados'))

    if (legMeals.length === 0 || fishMeals.length === 0) {
        throw new Error('Faltan recetas de legumbres o pescados en sugerencias')
    }

    const selectedMeals = new Map()

    // Primero, incluye al menos una de cada tipo en distintos días:
    selectedMeals.set('leg', [legMeals[0]])
    selectedMeals.set('fish', [fishMeals[0]])

    const MEAL_SLOTS = ['Desayuno', 'Almuerzo', 'Cena'] // Asegúrate de definir esto si no está definido

    for (let day = 0; day < 7; day++) {
        const date = addDays(startDate, day)
        // meta diaria
        const remaining = { ...macroGoals }
        for (const type of MEAL_SLOTS) {
            const slotKey = `${date.toISOString().slice(0, 10)}_${type}`
            let pool = enriched.filter(r => r.types.some(t => t.type === type))
            if (day === 0 && type === 'Almuerzo') pool = pool.concat(selectedMeals.get('leg'))
            if (day === 6 && type === 'Cena') pool = pool.concat(selectedMeals.get('fish'))

            pool = pool.filter(r => {
                const nut = r.nutrition
                return nut.calories <= remaining.calories &&
                    nut.protein <= remaining.protein &&
                    nut.carbs <= remaining.carbohydrates.max &&
                    nut.fats <= remaining.fat.max
            })
            if (pool.length === 0) continue
            const choice = pool[Math.floor(Math.random() * pool.length)]
            const nut = choice.nutrition

            // porción para ajustar proteína o calorías
            const factor = Math.min(
                remaining.protein / nut.protein || 1,
                remaining.calories / nut.calories || 1
            )
            const portion = Math.min(factor, 2) // no más de 2 veces

            // restar macros
            remaining.calories -= nut.calories * portion
            remaining.protein -= nut.protein * portion
            remaining.carbohydrates.estimated -= nut.carbs * portion
            remaining.fat.max -= nut.fats * portion

            // guardar
            if (!selectedMeals.has(slotKey)) selectedMeals.set(slotKey, [])
            selectedMeals.get(slotKey).push({ ...choice, portion, date, type })
        }
    }

    return Array.from(selectedMeals.values()).flat()
}

export async function getMealsByDate(userId, iso) {
    const start = parseISODate(iso)
    start.setUTCHours(0, 0, 0, 0)

    const end = parseISODate(iso)
    end.setUTCHours(23, 59, 59, 999)

    return await prisma.meal.findMany({
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
                        select: {
                            name: true,
                            image: true,
                            recipe_id: true
                        }
                    }
                }
            }
        },
        orderBy: { type: 'asc' }
    })
}