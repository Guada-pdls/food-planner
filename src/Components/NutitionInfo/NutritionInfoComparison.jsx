import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import calculateCaloriesWithFAO from "@/lib/calculations/calculateCaloriesWithFAO";
import calculateMacros from "@/lib/calculations/calculateMacros";
import { getServerSession } from "next-auth"

const NutritionInfoComparison = async ({ carbohydrates, fat, protein, fiber, calories }) => {
    let { user } = await getServerSession(authOptions);
    let recommendedCalories = calculateCaloriesWithFAO(user.weight, user.height, user.age, user.gender, 
        user.physical_activity == "Mínima" ? 1.2 :
        user.physical_activity == "Baja" ? 1.53 :
        user.physical_activity == "Moderada" ? 1.76 :
        2.25
    );
    let recommendedMacros = calculateMacros(recommendedCalories, user.gender, user.weight, user.physical_activity);

    return (
    <table className="table">
        <thead>
            <tr>
                <th></th>
                <th>Carbohidratos (g)</th>
                <th>Grasas (g)</th>
                <th>Proteínas (g)</th>
                <th>Fibra (g)</th>
                <th>Calorías (g)</th>
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
                <td>{recommendedMacros.carbohydrates.toFixed(2)}</td>
                <td>{recommendedMacros.fat.toFixed(2)}</td>
                <td>{recommendedMacros.protein.toFixed(2)}</td>
                <td>{recommendedMacros.fiber.toFixed(2)}</td>
                <td>{recommendedMacros.calories.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Diferencia</td>
                <td className="text-success">{(carbohydrates - recommendedMacros.carbohydrates).toFixed(2)}</td>
                <td className="text-success">{(fat - recommendedMacros.fat).toFixed(2)}</td>
                <td className="text-success">{(protein - recommendedMacros.protein).toFixed(2)}</td>
                <td className="text-success">{(fiber - recommendedMacros.fiber).toFixed(2)}</td>
                <td className="text-success">{(calories - recommendedMacros.calories).toFixed(2)}</td>
            </tr>
        </tbody>
    </table>
  )
}

export default NutritionInfoComparison