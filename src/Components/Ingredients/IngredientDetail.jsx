import NutritionInfo from "../NutitionInfo/NutritionInfo";
import RelatedRecipes from "./RelatedRecipes";

// TODO: Mismo que para receta
// viene así:
// {
//     "ingredient_id": 11,
//     "name": "quinoa",
//     "freezer": 180,
//     "fridge": 7,
//     "recommendations": "Almacenar cocida en refrigeración hasta 5 días o congelar",
//     "image": null,
//     "category": "Granos",
//     "nutrition_id": null (dia macros - comparar si cumplio o no dia, semana, mes) Funcion de un dia descomponga que dia son los del mes y que llame a la base de datos
// } 


 const nutritionalText = (info) => (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-2">Información Nutricional</h2>
      <NutritionInfo
        calories={info.calories}
        carbohydrates={info.carbs}
        fat={info.fats}
        protein={info.protein}
        fiber={info.fiber}
      />
    </div>
  );
  
const IngredientDetail = ({ ingredient }) => {
  return (
    <div className="">
      <h1 className="title">Detalle del ingrediente</h1>
      <h2 className="subtitle">{ingredient.name}</h2>
      <img className="w-[50vw] ms-4" src={ingredient.image} alt={ingredient.name}/>
      <div className="w-full border p-4 rounded bg-base-200 shadow pb-7 mb-7 mt-3">{nutritionalText(ingredient.nutrition_info)}</div>
      <div className="mb-4">
        <h3 className="subtitle2">Categoría:</h3>
        <p className="ms-4">{ingredient.category || "Sin categoría"}</p>
        <h3 className="subtitle2 mt-2">Duración en refrigerador:</h3>
        <p className="ms-4">{ingredient.fridge ? `${ingredient.fridge} días` : "No especificado"}</p>
        <h3 className="subtitle2 mt-2">Duración en congelador:</h3>
        <p className="ms-4">{ingredient.freezer ? `${ingredient.freezer} días` : "No especificado"}</p>
        <h3 className="subtitle2 mt-2">Recomendaciones de almacenamiento:</h3>
        <p className="ms-4">{ingredient.recommendations || "No hay recomendaciones"}</p>
      </div>
      <RelatedRecipes id={ingredient.ingredient_id}/>
    </div>
  )
}

export default IngredientDetail