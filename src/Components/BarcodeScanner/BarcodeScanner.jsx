'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { BarcodeFormat, DecodeHintType } from '@zxing/library'

export default function BarcodeScanner({ onResult }) {
  const videoRef = useRef(null)
  const controlsRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const hints = new Map()
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [ // Defino los formatos de código de barras que soporta
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
    ])

    const codeReader = new BrowserMultiFormatReader(hints)

    let hasScanned = false // Evita múltiples lecturas
    let isMounted = true // Para evitar actualizaciones de estado después de desmontar

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices() // Obtiene las cámaras disponibles
        if (!devices.length) throw new Error('No se encontró cámara')

        const deviceId = devices[0].deviceId // Usa la primera cámara disponible

        const controls = await codeReader.decodeFromVideoDevice( 
          deviceId,
          videoRef.current,
          (result, err, controls) => {
            if (!isMounted || hasScanned) return

            if (result) { // Si se detecta un código
              hasScanned = true // Evita que se procese más de una vez
              const code = result.getText() // Obtiene el texto del código escaneado
              console.log('✅ Código leído:', code) 
              onResult(code) // Llama a la función onResult con el código escaneado
              controls.stop() // Detiene el escáner
            }

            if (err && err.name !== 'NotFoundException') {
              console.error('❌ Error del escáner:', err)
            }
          }
        )

        controlsRef.current = controls // Guarda los controles para poder detener el escáner más tarde
      } catch (e) {
        console.error('Error al iniciar escáner:', e)
        if (isMounted) setError(e.message)
      }
    }

    startScanner()

    return () => {
      isMounted = false
      controlsRef.current?.stop?.()
    }
  }, [onResult])

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '100%', height: 'auto' }}
        autoPlay
        muted
        playsInline
      />
      {error && <p style={{ color: 'red' }}>⚠️ Error: {error}</p>}
    </div>
  )
}