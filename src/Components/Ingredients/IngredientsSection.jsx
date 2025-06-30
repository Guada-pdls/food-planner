import { getIngredientsByCategory } from "@/lib/repos/ingredients"
import Ingredient from "./Ingredient"

const IngredientsSection = async ({ category }) => {
    const ingredients = await getIngredientsByCategory(category)

    return (
        <section className="ingredient-category pb-2">
            <h2 className="subtitle">{category}</h2>
            {ingredients.length > 0 ? (
                <ul className="list-disc pl-4 flex gap-4 overflow-x-scroll">
                    {ingredients.map((ingredient, index) => (
                        <Ingredient key={index} {...ingredient} />
                    ))}
                </ul>
            ) : (
                <p className="pl-4">No se encontraron ingredientes en esta categoría.</p>
            )}
        </section>
    )
}

export default IngredientsSection