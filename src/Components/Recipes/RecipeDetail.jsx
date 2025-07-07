"use client";
import { useState } from "react";
import NutritionInfo from "../NutitionInfo/NutritionInfo";

const backgroundDetailsConfig = "flex flex-col items-center bg-base-100";

const listRecipe = (text) => {

  let recipeList = []
  const arrayListSentences = text.split(/\d+\.\s*/).filter(Boolean);

  for (let index = 1; index < arrayListSentences.length; index++) {
    recipeList.push(arrayListSentences[index])
  }

  return recipeList
}

const RecipeDetail = ({ recipe }) => {
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  if (!recipe) return <p>No se encontró la receta.</p>;

  listRecipe(recipe.procedure);
  const recipeText = <ol className="text-[4vw]">
    {listRecipe(recipe.procedure).map((step, ind) => {
      <li key={ind}>
        {console.log(step)}
        {step}
      </li>
    })};
  </ol>

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


  const changeInfo = (id) => {
    setActiveTab(id);
    if (id === "recipe") {
      setContent(recipeText);
    } else if (id === "nutritionalInfo") {
      setContent(nutritionalText(recipe.nutrition_info.info));
    }
  };
  return (
    <article className={backgroundDetailsConfig}>
      <h1 className="p-[4vw] title text-[8vw] font-bold">Detalles de la receta</h1>
      <h2 className="text-[6vw] mb-2">{recipe.name}</h2>

      <img className="w-[20vw]" src={recipe.image} alt={recipe.name} />

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-4 w-[90vw]">
        <table className="table ">
          <thead>
            <tr className="text-[4vw]">
              <th>Ingredientes</th>
              <th>Cantidades</th>
            </tr>
          </thead>
          <tbody className="text-[3.5vw]">
            {recipe.ingredients.length === 0 ? (
              <tr>
                <td>No se encontraron ingredientes.</td>
              </tr>
            ) : (
              recipe.ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.ingredient.name}</td>
                  <td>{ingredient.ingredient.amount || "6 [unidades]"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="my-4">
        <button
          className={`btn mr-2 xl:btn-2xl md:btn-xl ${activeTab === "recipe"
            ? "btn-secondary"
            : "btn-secondary btn-outline"
            }`}
          onClick={() => changeInfo("recipe")}
        >
          Receta
        </button>
        <button
          className={`btn xl:btn-2xl md:btn-xl ${activeTab === "nutritionalInfo"
            ? "btn-primary "
            : "btn-primary btn-outline"
            }`}
          onClick={() => changeInfo("nutritionalInfo")}
        >
          Información Nutricional
        </button>
      </div>


      <div className="w-full border p-4 rounded bg-base-200 shadow pb-7 mb-7">
        {content}
      </div>

      <div className="spaceBlank h-[20rem] w-full"></div>

    </article>

  );

};



export default RecipeDetail;
