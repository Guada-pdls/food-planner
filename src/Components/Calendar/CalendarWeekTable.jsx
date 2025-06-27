import WeekDay from './WeekDay'

const CalendarWeekTable = ({ days }) => {
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
                {days.map((day, index) => {
                    const { name, meals } = day;
                    return (
                        <WeekDay
                            key={index}
                            day={name}
                            meals={meals}
                        />
                    );
                })}
            </tbody>
        </table>
    )
}

export default CalendarWeekTable