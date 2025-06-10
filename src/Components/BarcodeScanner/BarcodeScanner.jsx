'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'

export default function BarcodeScanner({ onResult }) {
  const videoRef = useRef(null)
  const controlsRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let hasScanned = false
    let isMounted = true

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices()
        if (!devices.length) throw new Error('No se encontró cámara')

        const deviceId = devices[0].deviceId

        const controls = await codeReader.decodeFromVideoDevice(
          deviceId,
          videoRef.current,
          (result, err, controls) => {
            if (!isMounted || hasScanned) return

            if (result) {
              hasScanned = true
              const code = result.getText()
              console.log('✅ Código leído:', code)
              onResult(code)
              controls.stop()
            }

            if (err && err.name !== 'NotFoundException') {
              console.error('❌ Error del escáner:', err)
            }
          }
        )

        controlsRef.current = controls
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
