import { prisma } from '@/lib/prisma'

const VALID_MEAL_TYPES = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena']

export async function getAllRecipesLite() {
    return prisma.recipe.findMany({
        select: {
            recipe_id: true,
            name: true,
            cooking_time: true,
            types: {
                select: { type: true }
            },
            image: true,
            ingredients: {
                select: {
                    ingredient: {
                        select: {
                            ingredient_id: true,
                            name: true,
                            fridge: true,
                            freezer: true
                        }
                    }
                }
            }
        }
    })
}

export async function getFilteredRecipes({
    page = 1,
    limit = 10,
    name,
    type,
    ingredient,
}) {
    const skip = (page - 1) * limit

    return prisma.recipe.findMany({
        skip,
        take: limit,
        where: {
            AND: [
                name ? { name: { contains: name, mode: 'insensitive' } } : {},
                type
                    ? {
                        types: {
                            some: {
                                type: { equals: type, mode: 'insensitive' },
                            },
                        },
                    }
                    : {},
                ingredient
                    ? {
                        ingredients: {
                            some: {
                                ingredient: {
                                    name: { contains: ingredient, mode: 'insensitive' },
                                },
                            },
                        },
                    }
                    : {},
            ],
        },
        select: {
            recipe_id: true,
            name: true,
            cooking_time: true,
            types: {
                select: { type: true },
            },
            ingredients: {
                select: {
                    ingredient: {
                        select: {
                            ingredient_id: true,
                            name: true,
                            storage: true,
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
    ingredients, // array de { name, freezer, fridge, recommendations?, category }
    types,       // array de strings (deben ser valores válidos del enum)
    nutrition,   // { protein, carbs, fats, calories, fiber, quantity }
}) {
    const validTypes = types.filter((t) => VALID_MEAL_TYPES.includes(t))

    return await prisma.recipe.create({
        data: {
            name,
            procedure,
            cooking_time,
            serving_count,
            ingredients: {
                create: ingredients.map((ing) => ({
                    ingredient: {
                        connectOrCreate: {
                            where: { name: ing.name },
                            create: {
                                name: ing.name,
                                freezer: ing.freezer,
                                fridge: ing.fridge,
                                recommendations: ing.recommendations || null,
                                category: ing.category || null,
                            },
                        },
                    },
                })),
            },
            types: {
                create: validTypes.map((type) => ({
                    type,
                })),
            },
            nutrition_info: {
                create: {
                    info: {
                        create: nutrition,
                    },
                },
            },
        },
        include: {
            ingredients: { include: { ingredient: true } },
            types: true,
            nutrition_info: { include: { info: true } },
        },
    })
}