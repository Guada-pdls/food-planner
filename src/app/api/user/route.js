import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    await prisma.user.upsert({
      where: { email },
      update: {
        name,
        age,
        height,
        weight,
        physical_activity,
        gender,
        dislike_ingredients: preferences ? JSON.stringify(preferences) : undefined,
      },
      create: {
        email,
        name,
        age,
        height,
        weight,
        physical_activity,
        gender,
        dislike_ingredients: preferences ? JSON.stringify(preferences) : undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ error: 'Error saving user data' }, { status: 500 });
  }
}

