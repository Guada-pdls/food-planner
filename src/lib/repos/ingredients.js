import { prisma } from '@/lib/prisma'

export async function getAllIngredients() {
  return await prisma.ingredient.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      image: true,
    }
  })
}

export async function getIngredientById(id) {
  return await prisma.ingredient.findUnique({
    where: { ingredient_id: id },
    include: {
      nutrition_info: true,
    },
  })
}

export async function getIngredientsByCategory(category) {
  return await prisma.ingredient.findMany({
    where: { category },
    orderBy: {
      name: 'asc',
    },
  })
} 

export async function getIngredientByBarcode(barcode) {
  return await prisma.ingredient.findUnique({
    where: { barcode },
    include: {
      nutrition_info: true,
    },
  })
}