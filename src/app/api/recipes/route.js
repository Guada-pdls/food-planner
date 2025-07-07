import { NextResponse } from 'next/server'
import { getAllRecipesLite, addRecipe } from '@/lib/repos/recipes'
// Soporta: ?page=1&limit=10&name=pasta&type=desayuno&ingredient=cebolla

export async function GET() {
  try {
    const recipes = await getAllRecipesLite()
    return NextResponse.json(recipes)
  } catch (err) {
    console.error('Error fetching recipes:', err)
    return NextResponse.json({ error: 'Failed to load recipes' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    
    const { name, procedure, cooking_time, serving_count, ingredients, types, nutrition } = body

    if (!name || !ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }

    const recipe = await addRecipe({
      name,
      procedure,
      cooking_time,
      serving_count,
      ingredients,
      types,
      nutrition,
    })

    return NextResponse.json(recipe, { status: 201 })

  } catch (error) {
      console.error(error)
      console.log(req)
      return NextResponse.json({ error: 'Error al crear receta' }, { status: 500 })
  }
}
