import WeekDay from './WeekDay'

const CalendarWeekTable = ({ days }) => {
    console.log(days)
    return (
        <div className="overflow-x-scroll">
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
                    {days && days.map((day, index) => {
                        const { name, meals, iso } = day;
                        return (
                            <WeekDay
                                key={index}
                                day={name}
                                date={iso}
                                meals={meals}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CalendarWeekTable