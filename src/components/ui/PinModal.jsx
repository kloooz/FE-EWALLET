import React, { useState } from 'react'

export default function PinModal({ open, onClose, onSubmit }) {
  const [pin, setPin] = useState('')

  const handleChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
    setPin(v)
  }

  const handleSubmit = () => {
    if (pin.length !== 6) return alert('PIN must be 6 digits')
    onSubmit(pin)
    setPin('')
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-[320px]">
        <h3 className="text-lg font-semibold mb-2">Enter 6-digit PIN</h3>
        <input type="password" value={pin} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" className="w-full border rounded px-3 py-2 text-center text-xl tracking-widest font-mono" />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-3 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  )
}
