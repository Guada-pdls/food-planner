import Recipe from '@/Components/Recipes/Recipe'
import { useEffect, useState } from 'react'

const Recipes = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`)
    console.log(url.toString())
    if (searchQuery) url.searchParams.append('name', searchQuery)
    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setRecipes(data)
    })
    .catch(error => {
      console.error('Error fetching recipes: ', error)
    })
  }, [searchQuery])

  return (
    recipes.length === 0 ? (
      <p>No recipes available.</p>
    ) : (
      recipes.map((recipe) => (
        console.log(recipe),
        <Recipe key={recipe.recipe_id} {...recipe} />
      ))
    )
  )
}

export default Recipes
