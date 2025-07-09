const NutritionInfo = ({ calories, carbohydrates, fat, protein, fiber }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Carbohidratos (g)</th>
                    <th>Grasas (g)</th>
                    <th>Proteínas (g)</th>
                    <th>Fibra (g)</th>
                    <th>Valor energético (kcal)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{carbohydrates.toFixed(2)}</td>
                    <td>{fat.toFixed(2)}</td>
                    <td>{protein.toFixed(2)}</td>
                    <td>{fiber.toFixed(2)}</td>
                    <td>{calories.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default NutritionInfo