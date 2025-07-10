import { generateGroceryList, getGroceryList } from "@/lib/repos/groceryList";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const grocery_list = await getGroceryList(id)
        return NextResponse.json(grocery_list, { status: 200 })
    } catch (error) {
        console.error("Error fetching grocery list:", error);
        return NextResponse.json({ error: "Failed to fetch grocery list" }, { status: 500 })
    
    }
}

export async function POST(req, { params }) {
    const { id } = await params
    try {
        const new_grocery_list = await generateGroceryList(id)
        return NextResponse.json({ grocery_list: new_grocery_list}, { status: 201 })
    } catch (error) {
        console.error("Error generating grocery list:", error);
        return NextResponse.json({ error: "Failed to generate grocery list" }, { status: 500 })
    
    }
}