import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Input from '../ui/Input'
import PinModal from '../ui/PinModal'
import api from '../../api/axios'

export default function TransferForm({ onSuccess }) {
  const navigate = useNavigate()
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const [showPin, setShowPin] = useState(false)

  const handleInitialSubmit = (e) => {
    e.preventDefault()
    if (!to || !amount) {
      setError('Lengkapi data penerima dan nominal')
      return
    }
    setError(null)
    setFieldErrors({})
    setShowPin(true)
  }

  const handlePinSubmit = async (pin) => {
    if (loading) return
    setError(null)
    setLoading(true)
    try {
      const res = await api.post('/transfer', {
        identifier: to,
        amount: Number(amount),
        pin
      })
      setTo('')
      setAmount('')
      setFieldErrors({})
      onSuccess && onSuccess()

      const successData = res?.data?.data
      navigate('/transfer/success', { state: { transferData: successData } })
    } catch (err) {
      const data = err?.response?.data
      setError(data?.message || 'Transfer failed')
      setFieldErrors(data?.errors || {})
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && <div className="mb-3 p-3 bg-red-50 text-red-600 rounded text-sm">{error}</div>}
      <form onSubmit={handleInitialSubmit} className="mt-4">
        <Input label="Recipient username or email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="username" error={fieldErrors.identifier ? fieldErrors.identifier[0] : null} />
        <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100000" error={fieldErrors.amount && fieldErrors.amount[0]} />
        <Button loading={loading}>Send</Button>
      </form>
      <PinModal
        open={showPin}
        onClose={() => setShowPin(false)}
        onSubmit={handlePinSubmit}
      />
    </>
  )
}
