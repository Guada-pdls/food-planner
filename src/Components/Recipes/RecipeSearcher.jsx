'use client'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const RecipeSearcher = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [opened, setOpen] = useState(false)

  return (
    <div className='relative'>
      {!opened && (
        <CiSearch
          className='cursor-pointer text-2xl'
          onClick={() => setOpen(true)}
        />
      )}

      {opened && (
        <input
          autoFocus
          type='text'
          placeholder='Buscar receta...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='input input-bordered w-full max-w-xs'
        />
      )}
    </div>
  )
}

export default RecipeSearcher
