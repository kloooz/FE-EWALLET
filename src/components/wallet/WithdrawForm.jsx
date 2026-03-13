import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import PinModal from '../ui/PinModal'
import api from '../../api/axios'

const BANKS = [
    'BCA', 'BRI', 'BNI', 'Mandiri', 'BSI', 'CIMB Niaga', 'Danamon', 'Permata',
    'GoPay', 'OVO', 'Dana', 'ShopeePay'
]

export default function WithdrawForm({ onSuccess }) {
    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [showPin, setShowPin] = useState(false)

    const handleInitialSubmit = (e) => {
        e.preventDefault()
        if (!bankName || !accountNumber || !amount) {
            setError('Lengkapi semua field sebelum melanjutkan')
            return
        }
        if (Number(amount) < 10000) {
            setError('Minimal withdraw Rp 10.000')
            return
        }
        setError(null)
        setSuccessMsg(null)
        setShowPin(true)
    }

    const handlePinSubmit = async (pin) => {
        if (loading) return
        setLoading(true)
        setError(null)
        try {
            await api.post('/withdraw', {
                bank_name: bankName,
                account_number: accountNumber,
                amount: Number(amount),
                pin
            })
            setBankName('')
            setAccountNumber('')
            setAmount('')
            setSuccessMsg(`Withdraw ke ${bankName} berhasil!`)
            onSuccess && onSuccess()
        } catch (err) {
            const data = err?.response?.data
            setError(data?.message || 'Withdraw gagal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {error && <div className="mb-3 p-3 bg-red-50 text-red-600 rounded text-sm">{error}</div>}
            {successMsg && <div className="mb-3 p-3 bg-green-50 text-green-700 rounded text-sm">{successMsg}</div>}
            <form onSubmit={handleInitialSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Pilih Bank</label>
                    <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-fin-blue-1 bg-white"
                    >
                        <option value="">-- Pilih Bank --</option>
                        {BANKS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>
                <Input
                    label="Nomor Rekening"
                    type="text"
                    inputMode="numeric"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="e.g. 1234567890"
                />
                <Input
                    label="Jumlah (min Rp 10.000)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="50000"
                />
                <Button loading={loading}>Withdraw</Button>
            </form>
            <PinModal
                open={showPin}
                onClose={() => setShowPin(false)}
                onSubmit={handlePinSubmit}
            />
        </>
    )
}
