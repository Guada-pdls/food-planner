import { NextResponse } from 'next/server'
import { deleteMealsByWeek, generateWeeklyPlan, getMealsByDateRange } from '@/lib/repos/meals'

export async function POST(req) {
  const { startOfWeek, userId, macros, numDays } = await req.json()

  try {
    const result = await generateWeeklyPlan(startOfWeek, userId, macros, numDays)
    return NextResponse.json({ ok: true, meals: result })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const startISO = searchParams.get('startISO')
  const numDays = searchParams.get('numDays') || '7'

  if (!userId || !startISO) {
    return NextResponse.json(
      { ok: false, error: 'userId y startISO son requeridos' },
      { status: 400 }
    )
  }

  try {
    const result = await getMealsByDateRange(userId, startISO, parseInt(numDays))
    return NextResponse.json({ ok: true, meals: { days: result } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  const { userId, startOfWeek } = await req.json();

  if (!userId || !startOfWeek) {
    return NextResponse.json(
      { ok: false, error: 'userId y startOfWeek son requeridos' },
      { status: 400 }
    );
  }

  try {
    // Debes implementar esta función en tu repositorio
    await deleteMealsByWeek(userId, startOfWeek);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}