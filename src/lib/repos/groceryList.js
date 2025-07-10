import { getWeekRange } from "@/utils/date"
import { getMealsByDateRange } from "./meals"

export const getGroceryList = async (userId) => {
    const groceryList = await prisma.groceryList.findFirst({
        where: { user_id: userId },
        include: {
            items: true,
        },
    })
    return groceryList
}

export const addIngredientsToGroceryList = async (userId, ingredients) => {
    const existingGroceryList = await getGroceryList(userId)
    const newItems = ingredients.map((ingredient) => {
        return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
        }
    })
    existingGroceryList.items.push(...newItems)
    const updatedList = await updateGroceryList(userId, existingGroceryList)
    return updatedList
}

export const updateGroceryList = async (userId, newItems) => {
    const updatedList = await prisma.groceryList.update({
        where: { user_id: userId },
        data: {
            items: {
                deleteMany: {},
                create: newItems.map((item) => ({
                    ingredient_id: item.ingredient_id,
                    quantity: item.quantity,
                })),
            },
        },

    })
    return updatedList
}

export const generateGroceryList = async (userId) => {
    const startISO = getWeekRange(new Date()).start
    const meals = await getMealsByDateRange(userId, startISO, 7)
    let grocery_list = []
    for (const dayMeals of meals) { // De cada dia con 4 comidas
        for (const meal of dayMeals) { // De cada comida con una receta
            console.log(meal)
        }
    }
    return grocery_list
}