'use client'
import Recipe from '@/Components/Recipes/Recipe'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`)
    for (const [key, value] of searchParams.entries()) {
      url.searchParams.append(key, value)
    }

    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(setRecipes)
      .catch(error => {
        console.error('Error fetching recipes: ', error)
      })
  }, [searchParams.toString()])

  return (
    recipes.length === 0 ? (
      <p>No hay recetas disponibles con tus preferencias.</p>
    ) : (
      recipes.map((recipe) => (
        <Recipe key={recipe.recipe_id} {...recipe} />
      ))
    )
  )
}

export default Recipes
