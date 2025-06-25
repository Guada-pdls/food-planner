import Link from "next/link"

const RecipeDetail = (recipe) => {
  return (
    <div className="recipe-detail">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <Link href={"/ingredient/" + ingredient.id} key={index}>{ingredient.name}</Link>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  )
}

export default RecipeDetail