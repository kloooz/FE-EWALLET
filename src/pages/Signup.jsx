import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import api from '../api/axios'

export default function Signup() {
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setFieldErrors({})
    setLoading(true)
    try {
      await api.post('/register', {
        username,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
        pin
      })
      nav('/login')
    } catch (err) {
      const data = err?.response?.data
      setError(data?.message || 'Registration failed')
      setFieldErrors(data?.errors || {})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-sm text-slate-500">Sign up to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-4">
        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} error={fieldErrors.username && fieldErrors.username[0]} />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={fieldErrors.email && fieldErrors.email[0]} />
        <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} error={fieldErrors.phone && fieldErrors.phone[0]} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={fieldErrors.password && fieldErrors.password[0]} />
        <Input label="Password confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <Input label="Setup 6-Digit PIN" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} error={fieldErrors.pin && fieldErrors.pin[0]} />
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <Button loading={loading}>Create account</Button>
      </form>
    </div>
  )
}
