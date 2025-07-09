import { prisma } from '@/lib/prisma'

const VALID_MEAL_TYPES = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena']

export async function getSuggestedRecipes(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            dislike_ingredients: true,
            grocery_list: {
                include: {
                    items: true,
                },
            },
        },
    })

    if (!user) throw new Error(`User ${userId} not found.`)

    const dislikeNames = user.dislike_ingredients?.split(',').map(s => s.trim()) ?? []
    const allowedIngredientIds =
        user.grocery_list?.flatMap(list => list.items.map(i => i.ingredient_id)) ?? []

    const filter = {
        where: {
            ingredients: {
                some: {
                    ingredient: {
                        name: { notIn: dislikeNames },
                    },
                    ...(allowedIngredientIds.length > 0 && {
                        ingredient_id: { in: allowedIngredientIds },
                    }),
                },
            },
        },
        select: {
            recipe_id: true,
            name: true,
            image: true,
            types: true,
            cooking_time: true,
            ingredients: {
                include: {
                    ingredient: {
                        include: {
                            nutrition_info: true
                        }
                    }
                }
            }
        },
    }

    return prisma.recipe.findMany(filter)
}

export async function getFilteredRecipes({
    page = 1,
    limit = 10,
    name,
    time,
    type,
    ingredient,
}) {
    const skip = (page - 1) * limit

    return prisma.recipe.findMany({
        skip,
        take: limit,
        where: {
            AND: [
                name ? { name: { contains: name } } : {},
                type
                    ? {
                        types: {
                            some: {
                                type: { equals: type },
                            },
                        },
                    }
                    : {},
                ingredient
                    ? {
                        ingredients: {
                            some: {
                                ingredient: {
                                    name: { contains: ingredient },
                                },
                            },
                        },
                    }
                    : {},
                time ? { cooking_time: { lte: time } } : {}
            ],
        }
        ,
        select: {
            recipe_id: true,
            name: true,
            cooking_time: true,
            image: true,
            types: {
                select: { type: true },
            },
            ingredients: {
                select: {
                    ingredient: {
                        select: {
                            ingredient_id: true,
                            name: true,
                            fridge: true,
                            freezer: true,
                        },
                    },
                },
            },
        },
    })
}

export async function getRecipeById(id) {
    return prisma.recipe.findUnique({
        where: { recipe_id: id },
        include: {
            ingredients: {
                select: {
                    ingredient: {
                        select: {
                            ingredient_id: true,
                            name: true,
                        }
                    }
                }
            },
            types: {
                select: { type: true }
            },
            nutrition_info: {
                select: {
                    info: {
                        select: {
                            calories: true,
                            protein: true,
                            carbs: true,
                            fats: true,
                            fiber: true,
                            quantity: true
                        }
                    }
                }
            }
        }
    });
}

export async function addRecipe({
    name,
    procedure,
    cooking_time,
    serving_count,
    ingredients,
    types,
    nutrition,
    image = null,
    freezer,
    fridge,
}) {
    const validTypes = types.filter((t) => VALID_MEAL_TYPES.includes(t))

    const recipe = await prisma.recipe.create({
        data: {
            name,
            procedure,
            cooking_time,
            serving_count,
            image,
            fridge,
            freezer,
            nutrition_info: {
                create: {
                    info: {
                        create: nutrition,
                    },
                },
            },
        },
    })


    if (validTypes.length > 0) {
        await prisma.recipeType.createMany({
            data: validTypes.map((type) => ({
                recipe_id: recipe.recipe_id,
                type,
            })),
        })
    }

    for (const ing of ingredients) {
        let ingredient = await prisma.ingredient.findUnique({
            where: { name: ing.name },
        })

        if (!ingredient) {
            const nutritionData = ing.nutrition_info?.create ?? ing.nutrition_info ?? {
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
                fiber: 0,
                quantity: null,
            }

            const nutrition = await prisma.nutritionInfo.create({ data: nutritionData })

            ingredient = await prisma.ingredient.create({
                data: {
                    name: ing.name,
                    fridge: ing.fridge,
                    freezer: ing.freezer,
                    category: ing.category,
                    recommendations: ing.recommendations,
                    image: ing.image,
                    nutrition_id: nutrition.nutrition_id,
                },
            })
        }

        await prisma.recipeIngredient.create({
            data: {
                recipe_id: recipe.recipe_id,
                ingredient_id: ingredient.ingredient_id,
            },
        })
    }

    return prisma.recipe.findUnique({
        where: { recipe_id: recipe.recipe_id },
        include: {
            ingredients: {
                include: { ingredient: true },
            },
            types: true,
            nutrition_info: {
                include: {
                    info: true
                },
            },
        },
    })
}