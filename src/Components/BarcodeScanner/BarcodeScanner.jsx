'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { BarcodeFormat, DecodeHintType } from '@zxing/library'

export default function BarcodeScanner({ onResult }) {
  const videoRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const hints = new Map()
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13
    ])

    const codeReader = new BrowserMultiFormatReader(hints)
    let hasScanned = false
    let isMounted = true
    let stream

    const init = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        videoRef.current.srcObject = stream
        await videoRef.current.play()

        let lastScan = 0

codeReader.decodeFromStream(stream, videoRef.current, (result, err) => {
  const now = Date.now()
  if (!isMounted) return

  if (result && now - lastScan > 3000) {
    lastScan = now
    const code = result.getText()
    console.log('✅ Código leído:', code)
    onResult(code)
  }

  if (err && err.name !== 'NotFoundException') {
    console.error('❌ Escaneo falló:', err)
  }
})

      } catch (e) {
        console.error('🚨 Error iniciando escáner:', e)
        setError(e.message)
      }
    }

    init()

    return () => {
      isMounted = false
      stream?.getTracks()?.forEach(t => t.stop())
    }
  }, [onResult])

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        muted
        playsInline
      />
      {error && <p style={{ color: 'red' }}>⚠️ Error: {error}</p>}
    </div>
  )
}
