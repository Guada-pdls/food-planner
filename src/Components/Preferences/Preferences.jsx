// components/CategoryBlock.jsx
import React from "react";

const Preferences = ({ category, items, selectedItems, toggleItem }) => {
  return (
    <div className="mb-6 w-full">
      <h2 className="text-[4vw] xl:text-[2.5vw] mb-2 font-semibold">{category}</h2>
      <div className="flex flex-wrap gap-2 [&>*]:w-auto md:[&>*]:w-[20vw] xl:[&>*]:btn-lg">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleItem(category, item)}
            className={`btn btn-sm ${
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
  );
};

export default Preferences;
