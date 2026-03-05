import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import BalanceCard from '../components/wallet/BalanceCard'
import TopupForm from '../components/wallet/TopupForm'
import TransferForm from '../components/wallet/TransferForm'
import TransactionList from '../components/wallet/TransactionList'
import { Link } from 'react-router-dom'
import PromoBanner from '../components/ui/PromoBanner'
import MainLayout from '../layouts/MainLayout'

export default function Dashboard() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const w = await api.get('/balance')
      const t = await api.get('/transactions')
      setBalance(w.data?.data?.balance ?? 0)

      const txPayload = t.data?.data ?? t.data
      const txArray = Array.isArray(txPayload) ? txPayload : (txPayload?.data ?? [])
      setTransactions(txArray.slice(0, 5))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [user, setUser] = useState(null)
  useEffect(() => {
    let mounted = true
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile')
        if (!mounted) return
        setUser(res?.data?.data?.user ?? res?.data?.data ?? res?.data ?? null)
      } catch (err) {
        // ignore
      }
    }
    fetchProfile()
    return () => { mounted = false }
  }, [])

  const promos = [
    { id: 'promo-1', title: 'Diskon Kopi Spesial', subtitle: 'Cuma hari ini', price: 12000, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop' },
    { id: 'promo-2', title: 'Paket Nasi Hemat', subtitle: 'Limited', price: 15000, image: 'https://images.unsplash.com/photo-1604908177522-0c9f60f7a2b6?w=1200&q=80&auto=format&fit=crop' }
  ]

  return (
    <MainLayout>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
          Halo, {user?.username || 'Guest'} 👋
        </h2>
        <p className="text-sm text-slate-500">Welcome back to your dashboard</p>
      </div>

      <BalanceCard balance={balance} />

      {user && !user.has_pin && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-yellow-800">Please create a PIN</div>
              <div className="text-sm text-yellow-700 mt-1">You need a 6-digit PIN to authorize payments. Create it now.</div>
            </div>
            <div className="shrink-0">
              <Link to="/create-pin" className="inline-block bg-yellow-600 hover:bg-yellow-700 transition-colors text-white px-4 py-2 rounded text-sm font-medium">Create PIN</Link>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <h3 className="text-sm md:text-base font-semibold mb-2">Promotions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promos.map((p) => (
              <div key={p.id} className="">
                <PromoBanner id={p.id} title={p.title} subtitle={p.subtitle} price={p.price} />
              </div>
            ))}
          </div>
        </div>


        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-start">
          <div>
            <h3 className="text-sm md:text-base font-semibold mb-2">Pay with QR</h3>
            <div className="text-sm text-slate-700 max-w-xl">Use QR scan to pay merchants — funds will be deducted from your wallet balance. Open the dedicated payment page to start scanning.</div>
          </div>
          <div className="mt-4 w-full">
            <a href="/pay-qr" className="inline-block bg-blue-600 text-white px-4 py-2 rounded w-full text-center">Open Pay with QR</a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm md:text-base font-semibold mb-2">Top Up</h3>
          <TopupForm onSuccess={fetchData} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm md:text-base font-semibold mb-2">Transfer</h3>
          <TransferForm onSuccess={fetchData} />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-sm md:text-base font-semibold mb-2">Transactions</h3>
          <TransactionList items={transactions} />
        </div>
      </div>
    </MainLayout>
  )
}
