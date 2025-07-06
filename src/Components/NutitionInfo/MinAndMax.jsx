const MinAndMax = ({ calories, carbohydrates, fat, protein, fiber }) => {
    return (
        <table className="table w-screen">
            <thead>
                <tr className="">
                    <th className="w-[4vw]"></th>
                    <th className="text-wrap text-center px-0">Carbohidratos (g)</th>
                    <th className="text-wrap text-center px-0">Grasas (g)</th>
                    <th className="text-wrap text-center px-0">Proteínas (g)</th>
                    <th className="text-wrap text-center px-0">Fibra (g)</th>
                    <th className="text-wrap text-center px-0">Valor energético (kcal)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-0">Mínimos</td>
                    <td>{carbohydrates.min.toFixed(2)}</td>
                    <td>{fat.min.toFixed(2)}</td>
                    <td>{protein.min.toFixed(2)}</td>
                    <td>{fiber.min.toFixed(2)}</td>
                    <td>{calories.min.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="px-0">Máximos</td>
                    <td>{carbohydrates.max.toFixed(2)}</td>
                    <td>{fat.max.toFixed(2)}</td>
                    <td>{protein.max.toFixed(2)}</td>
                    <td>{fiber.max.toFixed(2)}</td>
                    <td>{calories.max.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="px-0">Estimados</td>
                    <td>{carbohydrates.estimated.toFixed(2)}</td>
                    <td>{fat.estimated.toFixed(2)}</td>
                    <td>{protein.estimated.toFixed(2)}</td>
                    <td>{fiber.estimated.toFixed(2)}</td>
                    <td>{calories.estimated.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default MinAndMax