import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import {
  upsertUserProfile,
  updateUserProfileByEmail,
} from '@/lib/repos/user'

export async function POST(req) {
  try {
    const body = await req.json()

    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await upsertUserProfile(body.email, body)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error al guardar los datos:', error)
    return NextResponse.json(
      { error: 'Error saving user data' },
      { status: 500 }
    )
  }
}

export async function PUT(req) {
  try {
    const token = await getToken({ req })
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    await updateUserProfileByEmail(token.email, body)

    return NextResponse.json({ message: 'Datos actualizados' })
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
