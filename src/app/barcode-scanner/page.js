'use client'

import { useEffect, useState } from 'react'
import BarcodeScanner from '../../Components/BarcodeScanner/BarcodeScanner'
import NutritionInfo from '@/Components/NutitionInfo/NutritionInfo'

export default function HomePage() {
  const [code, setCode] = useState(null)
  const [ingredient, setIngredient] = useState(null)

  useEffect(() => {
    if (code) {
      try {
        fetch(`/api/ingredients/${code}`)
          .then(response => {
            if (response.ok) {
              return response.json()
            }
            throw new Error('Error al obtener los ingredientes')
          })
          .then(data =>
            setIngredient(data)
          )
      } catch (error) {
        console.error('Error al buscar el ingrediente:', error)
      }
    }
  }, [code])

  return (
    <main className='pb-20 min-h-screen'>
      <h1>Escanea un código de barras</h1>
      <BarcodeScanner onResult={(value) => setCode(value)} />
      {code && <p>Código escaneado: {code}</p>}
      {ingredient && (
        <div className="mt-10">
          <h2 className='subtitle'>Información del ingrediente: {ingredient.name}</h2>
          <NutritionInfo
            calories={ingredient.nutrition_info.calories}
            carbohydrates={ingredient.nutrition_info.carbs}
            fat={ingredient.nutrition_info.fats}
            protein={ingredient.nutrition_info.protein}
            fiber={ingredient.nutrition_info.fiber}
          />
        </div>
      )}
    </main>
  )
}
