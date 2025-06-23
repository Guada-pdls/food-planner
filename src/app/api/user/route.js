import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function POST(req) {
  try {
    const {
      email,
      name,
      age,
      height,
      weight,
      physical_activity,
      gender,
      preferences,
    } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Si vienen datos de perfil (no solo preferencias)
    if (age || height || weight || physical_activity || gender || name) {
      await prisma.user.upsert({
        where: { email },
        update: {
          name,
          age,
          height,
          weight,
          physical_activity,
          gender,
        },
        create: {
          email,
          name: name ?? "",
          age: age ?? 0,
          height: height ?? 0,
          weight: weight ?? 0,
          physical_activity: physical_activity ?? "",
          gender: gender ?? "",
          dislike_ingredients: preferences
            ? JSON.stringify(preferences)
            : "[]",
        },
      });
    } else if (preferences && preferences.length > 0) {
      // Si solo vienen preferencias
      await prisma.user.update({
        where: { email },
        data: {
          dislike_ingredients: JSON.stringify(preferences),
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json(
      { error: 'Error saving user data' },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const token = await getToken({ req })

  try {
    const body = await req.json();
    const { weight, height, age, physical_activity } = body;

    await prisma.user.update({
      where: { email: token.email },
      data: { weight, height, age, physical_activity },
    });

    return NextResponse.json({ message: 'Datos actualizados' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}