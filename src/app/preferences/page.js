"use client";
import React, { useState } from "react";
import Preferences from '@/Components/Preferences/Preferences'
const background = "@container min-h-screen flex justify-center bg-base-100";

const Page = () => {
  const categories = {
    Verduras: ["Brócoli", "Repollo", "Col", "Rúcula", "Cúrcuma"],
    Frutas: ["Remolacha", "Ciruela", "Palta", "Limón", "Aceituna"],
    Legumbres: ["Lentejas", "Garbanzos", "Poroto negro", "Poroto flaco", "Poroto rojo"],
    Carnes: ["Vaca", "Pollo", "Cerdo", "Cordero", "Pescado"],
    Lácteos: ["Leche", "Queso parmesano", "Yogurt", "Queso crema"],
    Dulces: ["Chocolate", "Dulce de leche", "Edulcorante", "Nutella"],
  };

  const [selectedItems, setSelectedItems] = useState({});

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

  const handleClickButton = () => {
    const selectedList = [];
    for (const category in selectedItems) {
      if (selectedItems[category].length > 0) {
        selectedList.push(...selectedItems[category]);
      }
    }
    console.log("Seleccionados:", selectedList);
  };

  return (
    <div className={background}>
      <div id="textBox" className="px-4 sm:px-10 md:px-20 w-full p-6">
        <h1 className="text-[6vw] xl:text-[3vw] text-center m-4">Preferencias</h1>
        <p className="text-[3vw] xl:text-[2.5vw] mb-8">
          Indique sus preferencias seleccionando los alimentos que{" "}
          <strong>NO</strong> le gusten
        </p>

        {/* Renderizado de cada categoría con su propio componente */}
        {Object.keys(categories).map((category) => (
          <Preferences
            key={category}
            category={category}
            items={categories[category]}
            selectedItems={selectedItems}
            toggleItem={toggleItem}
          />
        ))}

        <button
          className="btn btn-soft btn-success mx-[40%] md:mx-[50%] md:mt-[10px] md:btn-lg xl:btn-xl xl:mx-[50%] xl:w-[10vw] xl:mt-[10px]"
          onClick={handleClickButton}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Page;
