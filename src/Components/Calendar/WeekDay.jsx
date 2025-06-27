import Link from "next/link"

const mealTypes = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];

const WeekDay = ({ day, date = '27-06-2025', meals }) => {
    // Agrupar comidas por tipo
    const mealsByType = meals?.reduce((acc, meal) => {
        if (!acc[meal.type]) acc[meal.type] = [];
        acc[meal.type].push(meal);
        return acc;
    }, {});

    return (
        <tr>
            <th className='bg-base-200 text-center py-7' style={{ verticalAlign: 'top' }}>
                <Link href={`/calendar/${date}`} className="text-lg font-semibold">
                    {day.slice(0, 3).toUpperCase()}
                </Link>
            </th>
            {mealTypes.map(type => (
                <td key={type} className="align-top">
                    {mealsByType && mealsByType[type]
                        ? mealsByType[type].map((meal, idx) => (
                            <div key={idx} className="mb-2 ml-2 font-medium">{meal.name}</div>
                        ))
                        : <span className="text-gray-400">-</span>
                    }
                </td>
            ))}
        </tr>
    )
}

export default WeekDay
