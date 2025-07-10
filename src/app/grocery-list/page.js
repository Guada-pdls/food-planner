"use client";
import GroceryListManager from "@/Components/GroceryList/GroceryListManager";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const GroceryPage = () => {
  const { data: session, status } = useSession();
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchGroceryList = async () => {
      try {
        const response = await fetch(`/api/grocery-list/${session.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setGroceryList(data);
      } catch (error) {
        console.error("Error fetching grocery list:", error);
      }
    };

    if (status === "authenticated") {
      fetchGroceryList();
    }
  }, [])

  return (
    <div className="h-screen flex-col justify-center  bg-base-100 pl-[1rem]">
      <h1 className="title">Lista de compras</h1>
      <GroceryListManager ingredientss={groceryList} id={session.user.id} />
    </div>
  );
};

export default GroceryPage;