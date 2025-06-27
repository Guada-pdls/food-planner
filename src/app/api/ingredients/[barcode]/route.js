import { getIngredientByBarcode } from "@/lib/repos/ingredients";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { barcode } = await params;
    try {
        const ingredient = await getIngredientByBarcode(barcode);
        if (!ingredient) {
            return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
        }
        return NextResponse.json(ingredient, { status: 200 });
    } catch (error) {
        console.error('Error fetching ingredient:', error);
        return NextResponse.json({ error: 'Failed to fetch ingredient' }, { status: 500 });
    }
}