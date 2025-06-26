import RecipeDetail from "@/Components/Recipes/RecipeDetail"
import { getRecipeById } from "@/lib/repos/recipes"

const page = async ({ params }) => {
    const { id } = await params
    const numericId = parseInt(id, 10)
    const recipe = await getRecipeById(numericId)

    return (
        <RecipeDetail recipe={recipe} />
    )
}

export default page