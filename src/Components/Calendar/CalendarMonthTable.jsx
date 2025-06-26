import MonthDay from './MonthDay'

const CalendarMonthTable = () => {
    return (
        <table className="table text-center border-b border-b-base-200" >
            <thead className='bg-base-200'>
                <tr>
                    <th></th>
                    <th>Desayuno</th>
                    <th>Almuerzo</th>
                    <th>Merienda</th>
                    <th>Cena</th>

                </tr>
            </thead>
            <tbody>
                <MonthDay day="Lunes" breakfastMeal={{ recipe: { name: "Huevo revuelto" }}} />
                <MonthDay day="Martes" snackMeal={{ recipe: { name: "Tostada con palta" }}} />
                <MonthDay day="Miércoles" lunchMeal={{ recipe: { name: "Ensalada César" }}} />
                <MonthDay day="Jueves" dinnerMeal={{ recipe: { name: "Pizza casera" }}} />
                <MonthDay day="Viernes" breakfastMeal={{ recipe: { name: "Avena cocida" }}} />
                <MonthDay day="Sábado" lunchMeal={{ recipe: { name: "Tacos de pollo" }}} />
                <MonthDay day="Domingo" snackMeal={{ recipe: { name: "Batido de frutas" }}} />
            </tbody>
        </table>
    )
}

export default CalendarMonthTable