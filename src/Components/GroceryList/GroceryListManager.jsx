"use client";
import React, { useState } from "react";
import GroceryListItem from "./GroceryListItem";

const initialIngredients = [
  { id: 1, name: "Huevos", checked: false },
  { id: 2, name: "Leche", checked: false },
  { id: 3, name: "Pan", checked: false },
];

const GroceryListManager = () => {
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
    <div className="">
      <h2 className="text-lg font-bold mb-2">Pendientes</h2>
      {unchecked.map((item) => (
        <GroceryListItem
          key={item.id}
          ingredient={item}
          onToggle={() => toggleCheck(item.id)}
        />
      ))}

      <h2 className="text-lg font-bold mt-6 mb-2">Comprados</h2>
      {checked.map((item) => (
        <GroceryListItem
          key={item.id}
          ingredient={item}
          onToggle={() => toggleCheck(item.id)}
        />
      ))}
    </div>
  );
};

export default GroceryListManager;
