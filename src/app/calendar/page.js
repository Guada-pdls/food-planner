'use client';
import CalendarWeekTable from "@/Components/Calendar/CalendarWeekTable";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Page() {
    // Día actual
    const today = new Date();
    // Fecha de inicio de la semana (lunes)
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    // Fecha de fin de la semana (domingo)
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

    // Generar días de la semana
    const generateWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            days.push({
                // Formato de fecha DD/MM/YYYY
                date: date.toLocaleDateString('es-ES'), // Formato DD/MM/YYYY
                name: date.toLocaleDateString('es-ES', { weekday: 'long' }), // Nombre del día en español
                meals: [] // Inicialmente sin comidas
            });
        }
        return days;
    };

    const [days, setDays] = useState(generateWeekDays());
    const [loading, setLoading] = useState(false);

    const generateMeals = () => {
        
    }

    const hanldeClick = () => {
        setLoading(true);
        setTimeout(() => {
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
