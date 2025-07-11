"use client";

const GroceryListItem = ({ ingredient, onToggle, name }) => {
  return (
    <div className="ingredientContainer flex items-center my-2 ms-4">
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={ingredient.checked}
        onChange={onToggle}
      />
      <p
        className={`ml-3 ${
          ingredient.checked && "line-through text-gray-500"
        }`}
      >
        {name} - {ingredient.quantity} {ingredient.unit}
      </p>
    </div>
  );
};

export default GroceryListItem;
