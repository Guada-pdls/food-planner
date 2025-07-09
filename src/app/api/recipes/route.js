import { NextResponse } from 'next/server'
import { getSuggestedRecipes, getFilteredRecipes, addRecipe } from '@/lib/repos/recipes'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
// Soporta: ?page=1&limit=10&name=pasta&type=desayuno&ingredient=cebolla

export async function GET(request) {
  try {
    const { user } = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)

    const filters = {
      name: searchParams.get('name') || undefined,
      type: searchParams.get('type') || undefined,
      ingredient: searchParams.get('ingredient') || undefined,
      time: searchParams.get('time') ? parseInt(searchParams.get('time')) : undefined,
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '10', 10),
    }

    const hasFilters = filters.name || filters.type || filters.ingredient || filters.time

    const recipes = hasFilters
      ? await getFilteredRecipes(filters)
      : await getSuggestedRecipes(user.id)

    return NextResponse.json(recipes)
  } catch (err) {
    console.error('Error fetching recipes:', err)
    return NextResponse.json(
      { error: 'Failed to load recipes' },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const body = await req.json()

    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: 'Se esperaba un array de recetas' }, { status: 400 })
    }

    // Validación estricta de todas las recetas
    const invalid = body.find((recipe) =>
      !recipe.name || !Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0
    )

    if (invalid) {
      return NextResponse.json(
        { error: `Receta inválida: "${invalid.name || 'sin nombre'}"` },
        { status: 400 }
      )
    }

    const createdRecipes = await Promise.all(
      body.map((recipeData) => addRecipe(recipeData))
    )

    return NextResponse.json(
      { created: createdRecipes.length, recipes: createdRecipes },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al crear receta' }, { status: 500 })
  }
}