const NutritionInfo = ({ calories, carbohydrates, fat, protein, fiber }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Carbohidratos</th>
                    <th>Grasas</th>
                    <th>Proteínas</th>
                    <th>Fibra</th>
                    <th>Calorías</th>
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