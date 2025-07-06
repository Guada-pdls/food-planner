import { NextResponse } from 'next/server'
import { generateMealPlan } from '@/lib/planning/generateMealPlan'

export async function POST(req) {
  const { startOfWeek, userId, macros, numDays } = await req.json()

  try {
    const result = await generateMealPlan(startOfWeek, userId, macros, numDays)
    return NextResponse.json({ ok: true, meals: result })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
