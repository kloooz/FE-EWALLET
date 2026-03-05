import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import api from '../../api/axios'

export default function TopupForm({ onSuccess }) {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const preset = [20000, 50000, 100000, 200000]
  const [method] = useState('midtrans')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)
    try {
      const res = await api.post('/topup', { amount: Number(amount), method })
      setAmount('')
      // If backend returns redirect_url, open it (Midtrans flow)
      const redirect = res?.data?.data?.transaction?.redirect_url || res?.data?.redirect_url || res?.data?.data?.redirect_url
      const snap_token = res?.data?.data?.transaction?.snap_token || res?.data?.snap_token || res?.data?.data?.snap_token

      if (redirect) {
        window.location.href = redirect
      } else if (snap_token) {
        window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snap_token}`
      }
      // if backend returns updated balance, pass it through
      onSuccess && onSuccess(res?.data?.data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Top up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="text-xs text-slate-500">Quick amounts</label>
      <div className="flex gap-2 mt-2">
        {preset.map((p) => (
          <button type="button" key={p} onClick={() => setAmount(String(p))} className="px-3 py-1 bg-gray-100 rounded text-sm">Rp {p.toLocaleString()}</button>
        ))}
      </div>

      <Input
        label="Top up amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="100000"
        error={error}
      />

      <div className="mt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-slate-500">Top up</label>
          <div className="text-xs text-slate-400">Using Midtrans sandbox</div>
        </div>
      </div>

      <Button loading={loading}>Top up Saldo</Button>

    </form>
  )
}
