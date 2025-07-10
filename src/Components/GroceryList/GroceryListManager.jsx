"use client";
import React, { useState } from "react";
import GroceryListItem from "./GroceryListItem";
import GroceryButtons from "./GroceryButtons";

const initialIngredients = [
  { id: 1, name: "Huevos", checked: false, quantity: 2, unit: "unidades" },
  { id: 2, name: "Leche", checked: false, quantity: 1, unit: "litro" },
  { id: 3, name: "Pan", checked: false, quantity: 1, unit: "unidad" },
];

const GroceryListManager = ({ ingredientss, id }) => {
  const [ingredients, setIngredients] = useState(initialIngredients);

  const toggleCheck = (id) => {
    const updated = ingredients.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setIngredients(updated);
  };

  const unchecked = ingredients.filter((item) => !item.checked);
  const checked = ingredients.filter((item) => item.checked);

  return (
    <>
      <GroceryButtons ingredients={ingredients} setIngredients={setIngredients} id={id} />
      <h2 className="subtitle">Pendientes</h2>
      {unchecked.map((item) => (
        <GroceryListItem
          key={item.id}
          ingredient={item}
          onToggle={() => toggleCheck(item.id)}
        />
      ))}

      <h2 className="subtitle">Comprados</h2>
      {checked.map((item) => (
        <GroceryListItem
          key={item.id}
          ingredient={item}
          onToggle={() => toggleCheck(item.id)}
        />
      ))}
    </>
  );
};

export default GroceryListManager;
