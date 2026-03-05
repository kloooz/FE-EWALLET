import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function CreatePin() {
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (pin.length !== 6) return setStatus({ type: 'error', text: 'PIN must be 6 digits' })
    setLoading(true)
    try {
      await api.post('/pin', { pin })
      setStatus({ type: 'success', text: 'PIN created' })
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', text: 'Failed to create PIN (backend unreachable)' })
      // fallback: simulate success
      setTimeout(() => navigate('/dashboard'), 800)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Create PIN</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-md">
        <p className="text-sm text-slate-600 mb-4">Create a 6-digit PIN to authorize payments.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0,6))} className="w-full border rounded px-3 py-2 text-center text-xl tracking-widest" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Create PIN'}</button>
          </div>
          {status && <div className={`mt-2 p-2 rounded text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{status.text}</div>}
        </form>
      </div>
    </MainLayout>
  )
}
