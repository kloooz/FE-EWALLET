import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../api/axios'

export default function Vouchers() {
    const [vouchers, setVouchers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        const fetchVouchers = async () => {
            try {
                const res = await api.get('/transactions')
                if (!mounted) return

                const payload = res.data?.data ?? res.data
                const allTx = Array.isArray(payload) ? payload : (payload?.data ?? [])

                // Filter for transactions that are promo purchases based on reference_id prefix (PRM_)
                const purchasedVouchers = allTx.filter(tx =>
                    tx.reference_id && tx.reference_id.startsWith('PRM_') && tx.status === 'success'
                )

                setVouchers(purchasedVouchers)
            } catch (err) {
                console.error('Failed to fetch vouchers', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchVouchers()
        return () => { mounted = false }
    }, [])

    return (
        <MainLayout>
            <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">My Vouchers</h2>
                <p className="text-sm text-slate-500">History of promos and vouchers you have purchased</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 min-h-[400px]">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : vouchers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {vouchers.map((v) => (
                            <div key={v.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition bg-slate-50 flex flex-col">
                                <div className="p-4 border-b border-slate-200 bg-white grow">
                                    <div className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">Voucher</div>
                                    <h3 className="font-bold text-lg mb-1">
                                        {(() => {
                                            const rawDesc = v.description.replace('Voucher - ', '').replace('Promo Purchase - ', '');
                                            if (rawDesc === 'promo-1') return 'Diskon Kopi Spesial';
                                            if (rawDesc === 'promo-2') return 'Paket Nasi Hemat';
                                            return rawDesc;
                                        })()}
                                    </h3>
                                    <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded text-center">
                                        <div className="text-[10px] text-blue-500 uppercase tracking-wide mb-1">Voucher Code</div>
                                        <div className="font-mono font-bold text-blue-700 text-sm md:text-base break-all select-all">
                                            {v.reference_id}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Purchased for:</span>
                                    <span className="font-bold text-slate-800">Rp {Number(v.amount).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🎫</div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-1">No Vouchers Found</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto">You haven't purchased any vouchers yet. Check out the latest promos on your dashboard.</p>
                        <a href="/dashboard" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition">Browse Promos</a>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
