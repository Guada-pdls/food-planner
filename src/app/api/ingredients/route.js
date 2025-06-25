import { getAllIngredients } from '@/lib/repos/ingredients'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const ingredients = await getAllIngredients()
    return NextResponse.json(ingredients, { status: 200 })
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 })
  }
}
