"use client";
import React from "react";

const GroceryListItem = ({ ingredient, onToggle }) => {
  return (
    <div className="ingredientContainer  flex items-center mb-2">
      <input
        type="checkbox"
        className="checkbox"
        checked={ingredient.checked}
        onChange={onToggle}
      />
      <p
        className={`ml-3 w-[33%] ${
          ingredient.checked ? "line-through text-gray-500" : ""
        }`}
      >
        {ingredient.name}
      </p>
    </div>
  );
};

export default GroceryListItem;
