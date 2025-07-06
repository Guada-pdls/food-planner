'use client'
import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import Loader from '../Loader/Loader'
import { useRouter, useSearchParams } from 'next/navigation'

const RecipeSearcher = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [opened, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchQuery) {
        params.set('name', searchQuery)
      } else {
        params.delete('name')
      }

      router.replace(`?${params.toString()}`)
      setLoading(false)
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [searchQuery])

  const handleChange = (e) => {
    const value = e.target.value
    setLoading(true)
    setSearchQuery(value)
  }

  return (
    <div className='relative flex flex-row items-center gap-2'>
      {loading && <Loader />}
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
