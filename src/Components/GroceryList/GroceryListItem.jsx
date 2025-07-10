"use client";

const GroceryListItem = ({ ingredient, onToggle }) => {
  return (
    <div className="ingredientContainer flex items-center my-2 ms-4">
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={ingredient.checked}
        onChange={onToggle}
      />
      <p
        className={`ml-3 w-[33%] ${
          ingredient.checked && "line-through text-gray-500"
        }`}
      >
        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
      </p>
    </div>
  );
};

export default GroceryListItem;
