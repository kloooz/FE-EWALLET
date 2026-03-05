import React from 'react'
import { useLocation, Link, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { formatRupiah } from '../utils/formatRupiah'

export default function QrSuccess() {
    const location = useLocation()
    const transaction = location.state?.transaction

    if (!transaction) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
                    <p className="text-slate-500 text-sm mb-6">Your QR payment has been completed</p>

                    <div className="bg-slate-50 rounded-xl p-6 mb-6 text-left">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-500 text-sm">Amount</span>
                            <span className="font-bold text-lg text-slate-800">{formatRupiah(transaction?.amount || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-500 text-sm">Description</span>
                            <span className="font-medium text-sm text-slate-800 text-right">{transaction?.description || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 pt-3 border-t border-slate-200">
                            <span className="text-slate-500 text-sm">Reference ID</span>
                            <span className="font-mono text-xs text-slate-800 text-right uppercase">{transaction?.reference_id || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">Date</span>
                            <span className="font-medium text-xs text-slate-800 text-right">
                                {transaction?.created_at ? new Date(transaction.created_at).toLocaleString() : new Date().toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link to="/dashboard" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition block text-center">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
