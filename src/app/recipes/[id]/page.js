import RecipeDetail from "@/Components/Recipes/RecipeDetail"
import { getRecipeById } from "@/lib/repos/recipes"

const page = async () => {
    const { params } = useRouter()
    const { id } = params
    const recipe = await getRecipeById(id)

    return (
        <RecipeDetail recipe={recipe} />
    )
}

export default page