import { prisma } from '../prisma'
import { getSuggestedRecipes } from '@/lib/repos/recipes'
import sumRecipeNutrition from '../calculations/sumRecipeNutrition'
import { generateMealDays } from './generateMealDays'

export async function generateMealPlan(startDate, userId, macros, numDays = 7) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { weight: true, gender: true, physical_activity: true }
  })
  const recs = await getSuggestedRecipes(userId)
  const enriched = recs.map(r => ({ ...r, nutrition: sumRecipeNutrition(r) }))

  const legMeals = enriched.filter(r =>
    r.ingredients.some(ri => ri.ingredient.category === 'Legumbres')
  )
  const fishMeals = enriched.filter(r =>
    r.ingredients.some(ri => ri.ingredient.category === 'Pescados')
  )

  if (legMeals.length === 0 || fishMeals.length === 0) {
    throw new Error('Faltan recetas de legumbres o pescados en sugerencias')
  }

  const days = generateMealDays(startDate, numDays)
  const MEAL_SLOTS = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena']

  for (let i = 0; i < numDays; i++) {
    const day = days[i]
    const date = new Date(day.iso)
    const remaining = { ...macros } // deep copy

    for (const type of MEAL_SLOTS) {
      let pool = enriched.filter(r => r.types.some(t => t.type === type))

      if (i === 0 && type === 'Almuerzo') pool = pool.concat(legMeals)
      if (i === numDays - 1 && type === 'Cena') pool = pool.concat(fishMeals)

      pool = pool.filter(r => {
        const n = r.nutrition
        return (
          n.calories > 0 &&
          n.protein > 0 &&
          n.carbs > 0 &&
          n.fats > 0
        )
      })

      if (!pool.length) continue

      const choice = pool[Math.floor(Math.random() * pool.length)]
      const n = choice.nutrition
      const factor = Math.min(
        remaining.protein / n.protein || 1,
        remaining.calories / n.calories || 1
      )
      const portion = Math.min(factor, 2)

      remaining.calories -= n.calories * portion
      remaining.protein -= n.protein * portion
      remaining.carbohydrates.estimated -= n.carbs * portion
      remaining.fat.max -= n.fats * portion
      day.meals.push({
        recipe_id: choice.recipe_id,
        name: choice.name,
        image: choice.image,
        type,
        portion,
        nutrition: n
      })

    }
  }
  return days
}
