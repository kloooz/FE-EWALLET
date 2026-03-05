import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import TransactionList from '../components/wallet/TransactionList'
import api from '../api/axios'

export default function Transactions() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await api.get('/transactions')
        if (!mounted) return
        // API may return paginated shape: { data: { data: [ ... ], current_page } }
        const payload = res?.data?.data ?? res?.data
        const list = Array.isArray(payload) ? payload : (payload?.data ?? [])
        setItems(list)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
    return () => { mounted = false }
  }, [])

  return (
    <MainLayout>
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Transactions</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <TransactionList items={items} loading={loading} />
      </div>
    </MainLayout>
  )
}
