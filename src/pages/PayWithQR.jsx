import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import ScanQR from '../components/wallet/ScanQR'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import PinModal from '../components/ui/PinModal'

export default function PayWithQR() {
  const [qrData, setQrData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const [pinOpen, setPinOpen] = useState(false)

  // Calculate scanned amount from parsed QR data
  let scannedAmount = null
  let merchantName = null
  try {
    if (qrData) {
      const decoded = JSON.parse(atob(qrData))
      if (decoded && decoded.amount) {
        scannedAmount = decoded.amount
      }
      if (decoded && decoded.merchant_name) {
        merchantName = decoded.merchant_name
      }
    }
  } catch (e) {
    // ignore, invalid qr
  }

  const handlePay = async (pin) => {
    setStatus(null)
    setLoading(true)
    try {
      const resp = await api.post('/scan-qr', { qr_code: qrData, pin })
      const ok = resp?.data?.success ?? false
      if (ok) {
        setStatus({ type: 'success', text: resp?.data?.message || 'Payment successful' })
        setTimeout(() => {
          navigate('/pay-qr/success', { state: { transaction: resp?.data?.data?.transaction } })
        }, 700)
      } else {
        setStatus({ type: 'error', text: resp?.data?.message || 'Payment failed' })
      }
    } catch (err) {
      console.warn('Scan-pay failed', err)
      setStatus({ type: 'error', text: err?.response?.data?.message || 'Payment failed (backend unavailable)' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Pay with QR</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 w-full">
        <h3 className="text-sm font-semibold mb-3">Scan QR</h3>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm aspect-square overflow-hidden rounded-xl">
            <ScanQR portrait onResult={(d) => { setQrData(d); setStatus(null) }} />
          </div>
          <div className="mt-4 text-center">
            {merchantName && (
              <div className="text-sm font-semibold text-slate-800 mb-1">{merchantName}</div>
            )}
            <div className="text-sm text-slate-700">Scanned amount: <span className="font-medium text-blue-600">{scannedAmount ? `Rp ${Number(scannedAmount).toLocaleString()}` : '-'}</span></div>
          </div>
          <div className="mt-4 w-full flex flex-col items-center">
            <button onClick={() => setPinOpen(true)} disabled={loading || !qrData} className="w-full md:w-1/2 bg-blue-600 text-white px-4 py-2 rounded mt-2">
              {loading ? 'Processing...' : 'Pay — Enter PIN'}
            </button>
            <button onClick={() => { setQrData(null); setStatus(null) }} className="w-full md:w-1/2 bg-gray-200 px-3 py-2 rounded mt-2">Clear</button>
          </div>

          {status && (
            <div className={`mt-3 p-2 rounded text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800' : status.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
              {status.text}
            </div>
          )}
        </div>
      </div>
      <PinModal open={pinOpen} onClose={() => setPinOpen(false)} onSubmit={(pin) => handlePay(pin)} />
    </MainLayout>
  )
}
