import calculateCaloriesWithFAO from "@/lib/calculations/calculateCaloriesWithFAO";
import calculateMacros from "@/lib/calculations/calculateMacros";

const NutritionInfoComparison = ({ carbohydrates, fat, protein, fiber, calories, user }) => {
    let recommendedCalories = calculateCaloriesWithFAO(user.weight, user.height, user.age, user.gender, user.physical_activity);
    let recommendedMacros = calculateMacros(recommendedCalories, user.gender, user.weight, user.physical_activity);

    return (
        <div className="overflow-x-scroll">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Carbohidratos (g)</th>
                        <th>Grasas (g)</th>
                        <th>Proteínas (g)</th>
                        <th>Fibra (g)</th>
                        <th>Valor energértico (kcal)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total consumido</td>
                        <td>{carbohydrates.toFixed(2)}</td>
                        <td>{fat.toFixed(2)}</td>
                        <td>{protein.toFixed(2)}</td>
                        <td>{fiber.toFixed(2)}</td>
                        <td>{calories.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Total sugerido</td>
    
                        <td>{recommendedMacros.carbohydrates.estimated.toFixed(2)}</td>
                        <td>{recommendedMacros.fat.estimated.toFixed(2)}</td>
                        <td>{recommendedMacros.protein.estimated.toFixed(2)}</td>
                        <td>{recommendedMacros.fiber.estimated.toFixed(2)}</td>
                        <td>{recommendedMacros.calories.estimated.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Diferencia</td>
                        {[
                            {
                                key: 'carbohydrates',
                                value: carbohydrates,
                                min: recommendedMacros.carbohydrates.min,
                                max: recommendedMacros.carbohydrates.max,
                                estimated: recommendedMacros.carbohydrates.estimated,
                            },
                            {
                                key: 'fat',
                                value: fat,
                                min: recommendedMacros.fat.min,
                                max: recommendedMacros.fat.max,
                                estimated: recommendedMacros.fat.estimated,
                            },
                            {
                                key: 'protein',
                                value: protein,
                                estimated: recommendedMacros.protein.estimated,
                                min: recommendedMacros.protein.min,
                                max: recommendedMacros.protein.max,
                            },
                            {
                                key: 'fiber',
                                value: fiber,
                                min: recommendedMacros.fiber.min,
                                max: recommendedMacros.fiber.max,
                                estimated: recommendedMacros.fiber.estimated,
                            },
                            {
                                key: 'calories',
                                value: calories,
                                estimated: recommendedMacros.calories.estimated,
                                min: recommendedMacros.calories.min,
                                max: recommendedMacros.calories.max,
                            }
                        ].map(({ key, value, estimated, min, max }, i) => {
                            const diff = value - estimated
                            const inRange =
                                (value >= min) &&
                                (value <= max)
    
                            return (
                                <td key={key} className={inRange ? 'text-success' : 'text-error'}>
                                    {diff.toFixed(2)}
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NutritionInfoComparison