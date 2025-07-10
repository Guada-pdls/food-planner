"use client";
import React from "react";
import GroceryListManager from "@/Components/GroceryList/GroceryListManager";

const GroceryPage = () => {
  return (
    <div className="h-screen flex-col justify-center  bg-base-100 pl-[1rem]">
      <h1 className="text-2xl font-bold mb-4">Lista de compras</h1>
      <GroceryListManager />
    </div>
  );
};

export default GroceryPage;