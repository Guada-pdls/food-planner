import { deleteMealById } from '@/lib/repos/meals';
import { NextResponse } from 'next/server'

export async function DELETE(req, {params}) {
    const { id } = await params

    try {
        const result = await deleteMealById(parseInt(id))
        return NextResponse.json({ ok: true, message: 'Meal deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            ok: false,
            error: error.message
        }, { status: 500 });
    }
}
