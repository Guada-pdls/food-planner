import { prisma } from '@/lib/prisma'

export async function getAllIngredients() {
  return await prisma.ingredient.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}
