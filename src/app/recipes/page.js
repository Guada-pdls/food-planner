'use client'

import { useState } from 'react'
import Recipes from '@/Components/Recipes/Recipes'
import RecipeSearcher from '@/Components/Recipes/RecipeSearcher'

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header>
        <h1 className='text-2xl font-bold'>Recipes</h1>
        <div className='flex justify-end'>
          <RecipeSearcher onSearch={setSearchQuery} />
        </div>
      </header>
      <main className='flex justify-center flex-wrap items-center p-4'>
        <Recipes searchQuery={searchQuery} />
      </main>
    </>
  )
}

export default page
