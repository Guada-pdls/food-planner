"use client";
import React, { useEffect, useState } from "react";
import GroceryListItem from "./GroceryListItem";
import GroceryButtons from "./GroceryButtons";

const GroceryListManager = ({ initialIngredients, id }) => {
  console.log(initialIngredients)
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [checked, setChecked] = useState([]);
  const [unchecked, setUnchecked] = useState([]);

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      setChecked(ingredients.filter((item) => item.checked));
      setUnchecked(ingredients.filter((item) => !item.checked));
    }
  }, [ingredients]);

  useEffect(() => {
    setIngredients(initialIngredients);
  }, [initialIngredients]);

  const toggleCheck = (id) => {
    const updated = ingredients.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setIngredients(updated);
  };
  return (
    <div className="pb-30">
      <GroceryButtons ingredients={ingredients} setIngredients={setIngredients} id={id} />
      <h2 className="subtitle">Pendientes</h2>
      {unchecked.map((item) => (
        <GroceryListItem
          key={item.id}
          ingredient={item}
          name={item.ingredient.name}
          onToggle={() => toggleCheck(item.id)}
        />
      ))}

      <h2 className="subtitle">Comprados</h2>
      {checked.map((item) => (
        <GroceryListItem
          key={item.id}
          ingredient={item}
          name={item.ingredient.name}
          onToggle={() => toggleCheck(item.id)}
        />
      ))}
    </div>
  );
};

export default GroceryListManager;
