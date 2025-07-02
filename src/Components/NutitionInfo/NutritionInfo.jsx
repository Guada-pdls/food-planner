const NutritionInfo = ({ calories, carbohydrates, fat, protein, fiber }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Carbohidratos (g)</th>
                    <th>Grasas (g)</th>
                    <th>Proteínas (g)</th>
                    <th>Fibra (g)</th>
                    <th>Calorías (g)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{carbohydrates}</td>
                    <td>{fat}</td>
                    <td>{protein}</td>
                    <td>{fiber}</td>
                    <td>{calories}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default NutritionInfo