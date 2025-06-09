'use client'

import { useState } from 'react'
import BarcodeScanner from '../../Components/BarcodeScanner/BarcodeScanner'

export default function HomePage() {
  const [code, setCode] = useState(null)

  return (
    <main style={{ padding: 20 }}>
      <h1>Escanea un código de barras</h1>
      <BarcodeScanner onResult={(value) => setCode(value)} />
      {code && <p>Código escaneado: {code}</p>}
    </main>
  )
}
