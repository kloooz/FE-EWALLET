import React, { useRef, useEffect, useState } from 'react'
import jsQR from 'jsqr'

export default function ScanQR({ onResult, portrait = false }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [scanningActive, setScanningActive] = useState(true)
  const [error, setError] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [facingMode, setFacingMode] = useState('environment')

  useEffect(() => {
    let animationId
    let stream

    const start = async () => {
      if (!scanningActive) return
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } })
        if (videoRef.current) videoRef.current.srcObject = stream
        await videoRef.current.play()

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const tick = () => {
          if (!scanningActive) return
          if (!videoRef.current) return
          if (videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
            animationId = requestAnimationFrame(tick)
            return
          }

          const vw = videoRef.current.videoWidth
          const vh = videoRef.current.videoHeight
          if (vw && vh && canvas) {
            canvas.width = vw
            canvas.height = vh
            ctx.drawImage(videoRef.current, 0, 0, vw, vh)
            try {
              const imageData = ctx.getImageData(0, 0, vw, vh)
              const code = jsQR(imageData.data, imageData.width, imageData.height)
              if (code) {
                setLastResult(code.data)
                setScanningActive(false)
                onResult && onResult(code.data)
                return
              }
            } catch (err) {
              // ignore intermittent canvas read errors on some devices
            }
          }
          animationId = requestAnimationFrame(tick)
        }

        tick()
      } catch (err) {
        console.error('Camera error', err)
        if (err && err.name === 'NotAllowedError') setError('Camera access was denied. Allow camera permission and retry.')
        else setError('Unable to access camera on this device.')
      }
    }

    start()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (stream && stream.getTracks) {
        stream.getTracks().forEach(t => t.stop())
      }
    }
  }, [scanningActive, onResult, facingMode])

  const handleRestart = () => {
    setError(null)
    setLastResult(null)
    setScanningActive(true)
  }

  const handleStop = () => {
    setScanningActive(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(t => t.stop())
    }
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-lg bg-black flex justify-center">
        <video
          ref={videoRef}
          className={portrait ? 'w-48 h-80 object-cover rounded-md' : 'w-full h-64 object-cover'}
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="hidden" />

        {lastResult && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 text-sm text-slate-900 px-3 py-2 rounded-md">QR Detected</div>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col items-center gap-2">
        <div className="text-sm text-slate-600">{error ?? (scanningActive ? 'Scanning for QR code...' : lastResult ? 'QR detected' : 'Paused')}</div>

        <div className="flex gap-2">
          {scanningActive ? (
            <button onClick={handleStop} className="text-sm px-3 py-1 bg-gray-200 rounded">Pause</button>
          ) : (
            <button onClick={handleRestart} className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Restart</button>
          )}

          <button
            onClick={() => setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')}
            className="text-sm px-3 py-1 bg-gray-200 rounded flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Flip Camera
          </button>
        </div>
      </div>

      {lastResult && <div className="mt-2 text-sm text-slate-700 break-words">Result: {lastResult}</div>}
    </div>
  )
}
