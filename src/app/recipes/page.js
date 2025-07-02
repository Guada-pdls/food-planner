'use client'
import { useState } from 'react'
import Recipes from '@/Components/Recipes/Recipes'
import RecipeSearcher from '@/Components/Recipes/RecipeSearcher'
import Filters from '@/Components/Recipes/Filters'

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header className='flex justify-between items-center pe-4'>
        <h1 className='title'>Recetas</h1>
        <div>
          <RecipeSearcher onSearch={setSearchQuery} />
        </div>
      </header>
      <main className='pb-20'>
        <Filters onSearch={setSearchQuery} />
        <h2 className='subtitle'>Para ti</h2>
        <section className='flex justify-center flex-wrap items-center p-4'>
          <Recipes searchQuery={searchQuery} />
        </section>
      </main>
    </>
  )
}

export default page
