import IngredientDetail from "@/Components/Ingredients/IngredientDetail"
import { getIngredientById } from "@/lib/repos/ingredients"

const page = async ({params}) => {
    const { id } = await params
    const numericId = parseInt(id, 10)
    const ingredient = await getIngredientById(numericId)
    
    return (
        <IngredientDetail ingredient={ingredient} />
    )
}

export default page