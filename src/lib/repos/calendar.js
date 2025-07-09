import { prisma } from "../prisma";

export async function getAllMealsById(id) {
    return await prisma.meal.findMany({
        where: { meal_id: id },
        include: {
            ingredients: {
                include: {
                    ingredient: true,
                },
            },
        },
    });
}

export async function getMealsByWeek(startDate, endDate) {
    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    return await prisma.meal.findMany({
        where: {
            date: {
                gte: start,
                lte: end,
            },
        },
        include: {
            ingredients: {
                include: {
                    ingredient: true,
                },
            },
        },
    })
}

export async function createMealsFromRecipes(userId, recipeIds, date) {
  const baseDate = new Date(date)
  baseDate.setHours(12, 0, 0, 0)

  const meals = await Promise.all(
    recipeIds.map(async (recipeId, i) => {
      const mealDate = new Date(baseDate)
      mealDate.setMinutes(i) // Pequeña variación de minutos para cada comida para evitar duplicados

      return prisma.meal.create({
        data: {
          date: mealDate,
          users: {
            create: {
              id: userId,
            },
          },
          recipes: {
            create: {
              recipe_id: recipeId,
            },
          },
        },
      })
    })
  )

  return meals
}