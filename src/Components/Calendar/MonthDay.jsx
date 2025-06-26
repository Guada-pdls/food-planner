import Link from "next/link"

const MonthDay = ({ day, date = '27-06-2025', breakfastMeal, lunchMeal, snackMeal, dinnerMeal }) => {
    return (
        <tr>
            <th className='bg-base-200 text-center py-7'>
                <Link href={`/calendar/${date}`} className="text-lg font-semibold">
                    {day.slice(0, 3).toUpperCase()}
                </Link>
            </th>
            <td>{breakfastMeal && breakfastMeal.recipe.name}</td>
            <td>{lunchMeal && lunchMeal.recipe.name}</td>
            <td>{snackMeal && snackMeal.recipe.name}</td>
            <td>{dinnerMeal && dinnerMeal.recipe.name}</td>
        </tr>
    )
}

export default MonthDay