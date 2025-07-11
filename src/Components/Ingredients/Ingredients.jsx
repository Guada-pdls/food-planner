const { default: IngredientsSection } = require("./IngredientsSection");

const categories = ['Frutas', 'Verduras', 'Carnes', 'Legumbres', 'Lácteos', 'Pescados'];

const Ingredients = () => {
  return (
    <>
      {categories.map((category, index) => (
        <IngredientsSection key={index} category={category} />
      ))}
    </>
  )
}

export default Ingredients