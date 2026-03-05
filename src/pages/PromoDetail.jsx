import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import api from '../api/axios'
import PinModal from '../components/ui/PinModal'

const SAMPLE_PROMOS = [
  { id: 'promo-1', title: 'Diskon Kopi Spesial', subtitle: 'Cuma hari ini', price: 12000, original: 20000, desc: 'Nikmati kopi spesial dengan potongan harga 40%.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop' },
  { id: 'promo-2', title: 'Paket Nasi Hemat', subtitle: 'Limited', price: 15000, original: 25000, desc: 'Paket nasi + lauk untuk makan siang.', image: 'https://images.unsplash.com/photo-1604908177522-0c9f60f7a2b6?w=1200&q=80&auto=format&fit=crop' }
]

export default function PromoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [promo, setPromo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    const p = SAMPLE_PROMOS.find((x) => x.id === id) || SAMPLE_PROMOS[0]
    setPromo(p)
  }, [id])

  const handleBuy = async (pin) => {
    if (!promo || !pin) return
    setLoading(true)
    setStatus(null)
    try {
      // Call backend purchase endpoint; backend will deduct balance
      await api.post('/purchase', { promoId: promo.id, promoTitle: promo.title, amount: promo.price, pin })
      setStatus({ type: 'success', text: 'Purchase successful.' })
      // refresh balance by redirecting to dashboard which will refetch
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (err) {
      console.error('Purchase API failed', err)
      setStatus({ type: 'error', text: err.response?.data?.message || err.message || 'Failed to purchase promo.' })
    } finally {
      setLoading(false)
    }
  }

  if (!promo) return null

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold">{promo.title}</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="h-40 md:h-56 bg-slate-100 rounded overflow-hidden">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-500">{promo.subtitle}</div>
            <div className="mt-2 text-2xl font-bold">Rp {promo.price.toLocaleString()}</div>
            <div className="text-sm line-through text-slate-400">Rp {promo.original.toLocaleString()}</div>
            <div className="mt-4 text-sm text-slate-700">{promo.desc}</div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => setShowPin(true)} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                {loading ? 'Processing...' : `Buy with Balance — Rp ${promo.price.toLocaleString()}`}
              </button>
              <button onClick={() => navigate(-1)} className="bg-gray-200 px-3 py-2 rounded">Back</button>
            </div>

            {status && (
              <div className={`mt-4 p-2 rounded text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.text}
              </div>
            )}
          </div>
        </div>
      </div>
      {showPin && (
        <PinModal
          open={showPin}
          onClose={() => setShowPin(false)}
          onSubmit={handleBuy}
        />
      )}
    </MainLayout>
  )
}
