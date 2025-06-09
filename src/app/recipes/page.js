import Recipe from '@/Components/Recipes/Recipe';
import React from 'react'

const recipes = [ // Example recipe data
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    ingredients: ['spaghetti', 'eggs', 'cheese', 'pancetta', 'pepper'],
    instructions: 'Cook spaghetti. In a bowl, mix eggs and cheese. Fry pancetta. Combine all with pepper.',
    imgUrl: 'https://example.com/spaghetti-carbonara.jpg'
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    description: 'A popular Indian dish consisting of marinated chicken in a spiced tomato sauce.',
    ingredients: ['chicken', 'yogurt', 'tomato sauce', 'spices'],
    instructions: 'Marinate chicken in yogurt and spices. Cook in a pan, add tomato sauce, and simmer.',
    imgUrl: 'https://example.com/chicken-tikka-masala.jpg'
  },
  {
    id: 3,
    title: 'Beef Tacos',
    description: 'Soft or hard shell tacos filled with seasoned ground beef, lettuce, cheese, and salsa.',
    ingredients: ['ground beef', 'taco shells', 'lettuce', 'cheese', 'salsa'],
    instructions: 'Cook ground beef with taco seasoning. Fill taco shells with beef, lettuce, cheese, and salsa.',
    imgUrl: 'https://example.com/beef-tacos.jpg'
  } 
];

const RecipesPage = () => {
  return (
    <main>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) :
      recipes.map((recipe => (
          <Recipe key={recipe.id} {...recipe} />
        )))
      }
    </main>
  )
}

export default RecipesPage