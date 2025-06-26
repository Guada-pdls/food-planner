import Link from "next/link"
// TODO: Agregar estilo
// viene con esta forma:
// {
//     "recipe_id": 4,
//     "procedure": "1. Cocinar la quinoa en agua. 2. Triturar los frijoles negros y mezclarlos con quinoa, huevo, salsa, harina de maíz y especias. 3. Formar hamburguesas y hornear o freír. 4. Servir con lechuga y palta.",
//     "cooking_time": 30,
//     "serving_count": 9,
//     "name": "Hamburguesa de quinoa y frijoles negros",
//     "fridge": null,
//     "freezer": null,
//     "image": null,
//     "ingredients": [
//         {
//             "ingredient": {
//                 "ingredient_id": 11,
//                 "name": "quinoa"
//             }
//         },
//         {
//             "ingredient": {
//                 "ingredient_id": 12,
//                 "name": "Palta"
//             }
//         },
//         {
//             "ingredient": {
//                 "ingredient_id": 13,
//                 "name": "Lechuga"
//             }
//         },
//         {
//             "ingredient": {
//                 "ingredient_id": 14,
//                 "name": "Huevos"
//             }
//         },
//         {
//             "ingredient": {
//                 "ingredient_id": 15,
//                 "name": "frijoles negros"
//             }
//         }
//     ],
//     "types": [],
//     "nutrition_info": {
//         "info": {
//             "calories": 1890,
//             "protein": 99,
//             "carbs": 306,
//             "fats": 36,
//             "fiber": 99,
//             "quantity": null
//         }
//     }
// }
const RecipeDetail = ({ recipe }) => {
  if (recipe == null) return <p>No se encontró la receta.</p>
  return (
    <article className="recipe-detail">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.length === 0 ?
          <p>No se encontraron ingredientes para esta receta.</p> :
          recipe.ingredients.map((ingredient, index) => (
            <Link href={"/ingredient/" + ingredient.id} key={index}>{ingredient.name}</Link>
          ))
        }
      </ul>
      <h2>Instrucciones</h2>
      <p>{recipe.procedure}</p>
    </article>
  )
}

export default RecipeDetail