import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import logoUrl from '../assets/danaku-logo.svg'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (loading) return
    setError(null)
    setLoading(true)
    try {
      await login({ identifier, password })
      nav('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <img src={logoUrl} alt="DANAKU" className="w-16 h-16" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-slate-500">Sign in to your DANAKU account</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <Input label="Email or Username" type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} autoComplete="new-password" />
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <Button loading={loading} onClick={handleSubmit}>Sign in</Button>
      </div>
      <div className="mt-3 text-center text-sm">
        <Link to="/forgot-password" className="text-slate-600 hover:underline">Forgot password?</Link>
      </div>
      <div className="mt-4 text-center text-sm">
        <span className="text-slate-600">Don't have an account? </span>
        <Link to="/signup" className="text-fin-blue-1 font-semibold hover:underline">Sign up</Link>
      </div>
    </div>
  )
}
