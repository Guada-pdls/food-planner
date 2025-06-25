'use client'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const RecipeSearcher = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [opened, setOpen] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

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
          onChange={handleChange}
          className='input input-bordered w-full max-w-xs'
        />
      )}
    </div>
  )
}

export default RecipeSearcher
