"use client";
import React, { useState } from "react";

const background = "@container min-h-screen flex justify-center bg-base-100";

const Page = () => {
  // Categorías y alimentos (nombres en español, variables en inglés)
  const categories = {
    Verduras: ["Brócoli", "Repollo", "Col", "Rúcula", "Cúrcuma"],
    Frutas: ["Remolacha", "Ciruela", "Palta", "Limón", "Aceituna"],
    Legumbres: [
      "Lentejas",
      "Garbanzos",
      "Poroto negro",
      "Poroto flaco",
      "Poroto rojo",
    ],
    Carnes: ["Vaca", "Pollo", "Cerdo", "Cordero", "Pescado"],
    Lácteos: ["Leche", "Queso parmesano", "Yogurt", "Queso crema"],
    Dulces: ["Chocolate", "Dulce de leche", "Edulcorante", "Nutella"],
  };

  // Estado con los seleccionados por categoría
  const [selectedItems, setSelectedItems] = useState({});

  // Alternar selección de un ítem dentro de una categoría
  const toggleItem = (category, item) => {
    setSelectedItems((prev) => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(item)
          ? current.filter((i) => i !== item)
          : [...current, item],
      };
    });
  };

   function handleClickButton(){
    const selectedList =[];

     {Object.entries(selectedItems).map(([category, items]) =>
            items.length > 0 ? (
              selectedList.push(items),
              
              console.log(selectedList)
            ) : null
          )}
   }
  return (
    <div className={background}>
      <div id="textBox" className="px-4 sm:px-10 md:px-20 w-full p-6">
        <h1 className="text-[6vw] xl:text-[3vw] text-center m-4">Preferencias</h1>
        <p className="text-[3vw] xl:text-[2.5vw] mb-8">
          Indique sus preferencias seleccionando los alimentos que{" "}
          <strong>NO</strong> le gusten
        </p>

        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-6 w-full">
            <h2 className="text-[4vw] xl:text-[2.5vw] mb-2 font-semibold">{category}</h2>
            <div className="flex flex-wrap gap-2 [&>*]:w-auto md:[&>*]:w-[20vw]  xl:[&>*]:btn-lg " >
              {items.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleItem(category, item)}
                  className={`btn btn-sm ${
                    //colores al hacer click
                    selectedItems[category]?.includes(item)
                      ? "bg-red-700"
                      : "btn-outline"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="btn  btn-soft btn-success mx-[40%] md:mx-[50%] md:mt-[10px] xl:mx-[50%] xl:mt-[10px] " onClick={handleClickButton}>Enviar</button>

        
        {/* Vista de seleccionados */}
        {/*
        <div className="mt-10 text-[3vw]">
          <h3 className="font-bold mb-2">Seleccionados:</h3>
          {Object.entries(selectedItems).map(([category, items]) =>
            items.length > 0 ? (
              <p key={category}>
                <span className="font-medium">{category}:</span>{" "}
                {items.join(", ")}
              </p>
            ) : null
          )}
        </div>
        */}


        

      </div>
    </div>
  );
};

export default Page;
