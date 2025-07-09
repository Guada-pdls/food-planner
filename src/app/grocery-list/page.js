import GroceryList from "@/Components/GroceryList/groceryList"
import React from 'react'
const page = () => {
  
let ingredient ={
    name:"arveja",
    id:2
}
  return (
    <div className="h-screen flex-col justify-center mt-[4vw] mb-[4vw] bg-base-100 ">
      <p className="t-[10vw]"> Lista de compras </p>
      <GroceryList ></GroceryList>
    </div>
  )
}

export default page