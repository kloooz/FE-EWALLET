import React, { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import api from '../api/axios'

export default function ForgotPassword() {
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
