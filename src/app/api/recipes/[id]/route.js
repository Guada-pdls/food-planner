import { NextResponse } from 'next/server'
import { getFilteredRecipes } from '@/lib/repos/recipe'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const name = searchParams.get('name') ?? undefined
    const type = searchParams.get('type') ?? undefined
    const ingredient = searchParams.get('ingredient') ?? undefined

    const recipes = await getFilteredRecipes({ page, limit, name, type, ingredient })
    return NextResponse.json(recipes)
  } catch (err) {
    console.error('Error filtering recipes:', err)
    return NextResponse.json({ error: 'Failed to filter recipes' }, { status: 500 })
  }
}