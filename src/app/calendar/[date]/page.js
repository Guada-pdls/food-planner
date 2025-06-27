import DayDetail from "@/Components/Calendar/DayDetail"

const page = async ({ params }) => {
    let { date } = await params
    date = '27-06-2025' // hardcodeado por ahora
    let meals = [
        { type: 'Desayuno', name: 'Tostadas de aguacate', nutrition_info: { calories: 500, carbohydrates: 40, fat: 15, protein: 9, fiber: 5 } },
        { type: 'Almuerzo', name: 'Burrito de frijoles y arroz', nutrition_info: { calories: 700, carbohydrates: 70, fat: 12, protein: 20, fiber: 10 } },
        { type: 'Merienda', name: 'Frutas frescas', nutrition_info: { calories: 220, carbohydrates: 32, fat: 2, protein: 1, fiber: 10 } },
        { type: 'Merienda', name: 'Cookies integrales', nutrition_info: { calories: 280, carbohydrates: 20, fat: 5, protein: 2, fiber: 2 } },
        { type: 'Cena', name: 'Estofado de ternera', nutrition_info: { calories: 550, carbohydrates: 35, fat: 25, protein: 40, fiber: 5 } }
    ]
    return (
        <main className="pb-20">
            <h1 className="title">Detalle del día Viernes {date}</h1>
            <DayDetail meals={meals} date={date} />
        </main>
    )
}

export default page