"use client";
import { useState } from "react";
import NutritionInfo from "../NutitionInfo/NutritionInfo";

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
// } Dia: Vertical Bar Chart 
// Semana: Multi Axis Line Chart

const backgroundDetailsConfig = "flex flex-col items-center bg-base-100";

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
  console.log(ingredient);
  return (
    <div className={backgroundDetailsConfig}>
      
      
      <h1 className="text-[8vw] font-bold mb-2">Detalles ingrediente</h1>
      <h2 className="text-[5.5vw] mb-2">{ingredient.name}</h2>
      <img className="w-[20vw]" src={ingredient.image} alt={ingredient.name}/>
      <div className="w-full border p-4 rounded bg-base-200 shadow pb-7 mb-7 mt-3">{nutritionalText(ingredient)}</div>
      
    
    
    
    
    
    </div>
  )
}

export default IngredientDetail