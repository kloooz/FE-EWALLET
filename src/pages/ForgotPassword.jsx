import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import api from '../api/axios'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const res = await api.post('/forgot-password', { email })
      setSuccess(res?.data?.message || 'If the email exists, you will receive instructions.')
    } catch (err) {
      setError(err?.response?.data?.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate('/login')}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <p className="text-sm text-slate-500">Enter your email to reset password</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-4">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        {success && <div className="text-sm text-green-600 mb-2">{success}</div>}
        <Button loading={loading}>Send reset link</Button>
      </form>
    </div>
  )
}
