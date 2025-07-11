import { getWeekRange } from "@/utils/date"
import { getMealsByDateRange } from "./meals"

export const getGroceryList = async (userId) => {
    const groceryList = await prisma.groceryList.findFirst({
        where: { user_id: userId },
        include: {
            items: {
                include: {
                    ingredient: true,
                },
            },
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
    let grocery_list = {}
    meals.forEach(dayMeals => {
        for (const meal of dayMeals.meals) { // De cada dia con 4 comidas
            for (const mealRecipe of meal.recipes) { // De cada receta de esa comida
                for (const ingredient of mealRecipe.recipe.ingredients) { // De cada ingredient
                    if (!grocery_list[ingredient.name]) {
                        grocery_list[ingredient.name] = {
                            quantity: ingredient.quantity,
                            unit: ingredient.unit,
                        }
                    } else if ((grocery_list[ingredient.name].unit == 'unidad' || grocery_list[ingredient.name].unit == 'unidades') && (ingredient.unit == 'unidad' || ingredient.unit == 'unidades')) { // Si el que esta guardado esta en unidad o unidades Y el que vamos a agregar tambien
                        grocery_list[ingredient.name].quantity += ingredient.quantity
                        grocery_list[ingredient.name].unit == 'unidades'
                    } else if (grocery_list[ingredient.name].unit == ingredient.unit) {
                        grocery_list[ingredient.name].quantity += ingredient.quantity
                    } else {
                        console.error('No se pudo agregar ' + ingredient.name + ' porque las unidades no coinciden')
                    }
                    grocery_list[ingredient.name].id = ingredient.ingredient_id
                    grocery_list[ingredient.name].checked = false
                }
            }
        }
    })

    const groceryList = await getGroceryList(userId)
    if (!groceryList) {
        throw new Error("Grocery list not found for user")
    }
    const added = await prisma.groceryList.update({
        where: { id: groceryList.id },
        data: {
            items: {
                deleteMany: {},
                create: Object.values(grocery_list).map((item) => ({
                    ingredient_id: item.id,
                    quantity: item.quantity,
                    unit: item.unit,
                    checked: item.checked
                })),
            },
        },
    })

    return groceryList.items
}