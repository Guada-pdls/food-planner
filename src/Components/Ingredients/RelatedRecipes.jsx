import { getRecipeByIngredientId } from "@/lib/repos/recipes"
import Recipe from "../Recipes/Recipe"


const RelatedRecipes = async ({ id }) => {
    const recipes = await getRecipeByIngredientId(id)
    return (
        <section className="pb-24">
            <h3 className="subtitle">Recetas relacionadas</h3>
            {recipes && recipes.length ?
            recipes.map(recipe => {
                return (
                    <Recipe key={recipe.recipe_id} {...recipe}/>
                )
            })
        : <p className="ps-4">No se encontraron recetas relacionadas con este ingrediente</p>}
        </section>
    )
}

export default RelatedRecipes