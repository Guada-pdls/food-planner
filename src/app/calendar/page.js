'use client';
import CalendarWeekTable from "@/Components/Calendar/CalendarWeekTable";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Page() {

    const [days, setDays] = useState([
        {
            date: '2025-06-23',
            name: 'Lunes',
            meals: []
        },
        {
            date: '2025-06-24',
            name: 'Martes',
            meals: []
        },
        {
            date: '2025-06-25',
            name: 'Miércoles',
            meals: []
        },
        {
            date: '2025-06-26',
            name: 'Jueves',
            meals: []
        },
        {
            date: '2025-06-27',
            name: 'Viernes',
            meals: []
        },
        {
            date: '2025-06-28',
            name: 'Sábado',
            meals: []
        },
        {
            date: '2025-06-29',
            name: 'Domingo',
            meals: []
        }
    ]);
    const [loading, setLoading] = useState(false);

    const generateMeals = () => {
        return [
            {
                date: '2025-06-23',
                name: 'Lunes',
                meals: [
                    { type: 'Desayuno', name: 'Tostadas con aguacate', nutrition_info: { calories: 300, carbohydrates: 30, fat: 15, protein: 10, fiber: 5 } },
                    { type: 'Almuerzo', name: 'Ensalada César', nutrition_info: { calories: 450, carbohydrates: 20, fat: 25, protein: 20, fiber: 7 } },
                    { type: 'Merienda', name: 'Yogur con frutas', nutrition_info: { calories: 200, carbohydrates: 30, fat: 5, protein: 10, fiber: 4 } },
                    { type: 'Cena', name: 'Salmón a la parrilla con verduras', nutrition_info: { calories: 500, carbohydrates: 10, fat: 30, protein: 40, fiber: 8 } }
                ]
            },
            {
                date: '2025-06-24',
                name: 'Martes',
                meals: [
                    { type: 'Desayuno', name: 'Batido de frutas', nutrition_info: { calories: 250, carbohydrates: 40, fat: 5, protein: 5, fiber: 3 } },
                    { type: 'Almuerzo', name: 'Pollo al horno con arroz', nutrition_info: { calories: 600, carbohydrates: 50, fat: 20, protein: 40, fiber: 4 } },
                    { type: 'Merienda', name: 'Torta de queso', nutrition_info: { calories: 350, carbohydrates: 45, fat: 15, protein: 8, fiber: 2 } },
                    { type: 'Cena', name: 'Pasta con salsa de tomate', nutrition_info: { calories: 400, carbohydrates: 60, fat: 10, protein: 15, fiber: 6 } }
                ]
            },
            {
                date: '2025-06-25',
                name: 'Miércoles',
                meals: [
                    { type: 'Desayuno', name: 'Tortilla de patatas', nutrition_info: { calories: 400, carbohydrates: 30, fat: 20, protein: 15, fiber: 4 } },
                    { type: 'Almuerzo', name: 'Sopa de lentejas', nutrition_info: { calories: 350, carbohydrates: 50, fat: 10, protein: 20, fiber: 8 } },
                    { type: 'Merienda', name: 'Barra de granola', nutrition_info: { calories: 200, carbohydrates: 30, fat: 5, protein: 5, fiber: 3 } },
                    { type: 'Cena', name: 'Tacos de carne asada', nutrition_info: { calories: 550, carbohydrates: 40, fat: 25, protein: 30, fiber: 5 } }
                ]
            },
            {
                date: '2025-06-26',
                name: 'Jueves',
                meals: [
                    { type: 'Desayuno', name: 'Avena con frutas', nutrition_info: { calories: 300, carbohydrates: 50, fat: 10, protein: 10, fiber: 8 } },
                    { type: 'Almuerzo', name: 'Ensalada de atún', nutrition_info: { calories: 400, carbohydrates: 20, fat: 15, protein: 30, fiber: 5 } },
                    { type: 'Merienda', name: 'Galletas integrales', nutrition_info: { calories: 150, carbohydrates: 25, fat: 5, protein: 3, fiber: 2 } },
                    { type: 'Cena', name: 'Pizza de verduras', nutrition_info: { calories: 600, carbohydrates: 70, fat: 20, protein: 25, fiber: 6 } }
                ]
            },
            {
                date: '2025-06-27',
                name: 'Viernes',
                meals: [
                    { type: 'Desayuno', name: 'Tostadas de aguacate', nutrition_info: { calories: 350, carbohydrates: 40, fat: 15, protein: 10, fiber: 5 } },
                    { type: 'Desayuno', name: 'Batido de plátano y espinacas', nutrition_info: { calories: 250, carbohydrates: 35, fat: 5, protein: 8, fiber: 3 } },
                    { type: 'Almuerzo', name: 'Bowl de quinoa con pollo', nutrition_info: { calories: 500, carbohydrates: 60, fat: 15, protein: 30, fiber: 7 } },
                    { type: 'Almuerzo', name: 'Burrito de frijoles y arroz', nutrition_info: { calories: 550, carbohydrates: 70, fat: 15, protein: 20, fiber: 6 } },
                    { type: 'Merienda', name: 'Frutas frescas', nutrition_info: { calories: 100, carbohydrates: 25, fat: 0, protein: 1, fiber: 3 } },
                    { type: 'Cena', name: 'Estofado de ternera', nutrition_info: { calories: 700, carbohydrates: 40, fat: 30, protein: 50, fiber: 4 } }
                ]
            },
            {
                date: '2025-06-28',
                name: 'Sábado',
                meals: [
                    { type: 'Desayuno', name: 'Batido de proteínas', nutrition_info: { calories: 300, carbohydrates: 30, fat: 5, protein: 25, fiber: 2 } },
                    { type: 'Almuerzo', name: 'Hamburguesa de pavo', nutrition_info: { calories: 600, carbohydrates: 40, fat: 25, protein: 40, fiber: 5 } },
                    { type: 'Merienda', name: 'Palomitas de maíz', nutrition_info: { calories: 150, carbohydrates: 30, fat: 5, protein: 3, fiber: 4 } },
                    { type: 'Cena', name: 'Sushi variado', nutrition_info: { calories: 500, carbohydrates: 60, fat: 15, protein: 20, fiber: 3 } }
                ]
            },
            {
                date: '2025-06-29',
                name: 'Domingo',
                meals: [
                    { type: 'Desayuno', name: 'Tortilla de verduras', nutrition_info: { calories: 350, carbohydrates: 20, fat: 15, protein: 20, fiber: 4 } },
                    { type: 'Almuerzo', name: 'Pasta con pollo y brócoli', nutrition_info: { calories: 600, carbohydrates: 70, fat: 20, protein: 40, fiber: 6 } },
                    { type: 'Merienda', name: 'Yogur griego con miel', nutrition_info: { calories: 200, carbohydrates: 30, fat: 5, protein: 10, fiber: 2 } },
                    { type: 'Cena', name: 'Pescado al horno con espárragos', nutrition_info: { calories: 500, carbohydrates: 20, fat: 25, protein: 35, fiber: 5 } }
                ]
            }
        ];
    }

    const hanldeClick = () => { 
        setLoading(true);
        setTimeout(() => { // Simula una llamada a la API
            setDays(generateMeals());
            setLoading(false);
        }, 500);
    }

    return (
        <main className='pb-20 w-full'>
            <header>
                <h1 className="title">Calendario de Comidas</h1>
                <nav className="flex justify-between items-center w-full max-w-3xl px-4 pb-2">
                    <FaArrowLeft className="text-2xl cursor-pointer" />
                    <div>
                        <p className="text-2xl font-semibold px-4">Junio 2025</p>
                        <p className="text-sm text-center">Semana 23/06 - 29/06</p>
                    </div>
                    <FaArrowRight className="text-2xl cursor-pointer" />
                </nav>
            </header>
            <CalendarWeekTable days={days} />
            <div className="flex justify-center py-4 bg-base-300"><button className='btn btn-wide btn-circle btn-secondary' onClick={hanldeClick}>{loading ? 'Generando...' : 'Generar automáticamente'}</button></div>
        </main>
    )
}
