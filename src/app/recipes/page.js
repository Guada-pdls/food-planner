import Recipes from '@/Components/Recipes/Recipes';
import RecipeSearcher from '@/Components/Recipes/RecipeSearcher';

const recipes = [ // Example recipe data
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    ingredients: ['spaghetti', 'eggs', 'cheese', 'pancetta', 'pepper'],
    instructions: 'Cook spaghetti. In a bowl, mix eggs and cheese. Fry pancetta. Combine all with pepper.',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRXpm1GLCvYeS0bzFJJdHmlYt8oUr1vjg1hg&s'
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    description: 'A popular Indian dish consisting of marinated chicken in a spiced tomato sauce.',
    ingredients: ['chicken', 'yogurt', 'tomato sauce', 'spices'],
    instructions: 'Marinate chicken in yogurt and spices. Cook in a pan, add tomato sauce, and simmer.',
    imgUrl: 'https://www.seriouseats.com/thmb/DbQHUK2yNCALBnZE-H1M2AKLkok=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG'
  },
  {
    id: 3,
    title: 'Beef Tacos',
    description: 'Soft or hard shell tacos filled with seasoned ground beef, lettuce, cheese, and salsa.',
    ingredients: ['ground beef', 'taco shells', 'lettuce', 'cheese', 'salsa'],
    instructions: 'Cook ground beef with taco seasoning. Fill taco shells with beef, lettuce, cheese, and salsa.',
    imgUrl: 'https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg'
  }
];

const page = () => {
  return (
    <>
      <header>
        <h1 className='text-2xl font-bold'>Recipes</h1>
        <div className='flex justify-end'>
          <RecipeSearcher />
        </div>
      </header>
      <main className='flex items-center p-4'>

        <Recipes recipes={recipes} />
      </main>
    </>
  )
}

export default page