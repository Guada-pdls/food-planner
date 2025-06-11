import Recipe from '@/Components/Recipes/Recipe';

const Recipes = ({ recipes }) => {
  return (recipes.length === 0 ? (
    <p>No recipes available.</p>
  ) :
    recipes.map((recipe) => (
      <Recipe key={recipe.id} {...recipe} />
    ))
  )
}

export default Recipes