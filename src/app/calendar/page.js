import CalendarMonthTable from "@/Components/Calendar/CalendarMonthTable";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Page() {
  
    return (
        <main  className='pb-20 w-full'>
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
            <CalendarMonthTable />
            <div className="flex justify-center py-4 bg-base-300"><button className='btn btn-wide btn-circle btn-secondary'>Generar automáticamente</button></div>
        </main>
    )
}
