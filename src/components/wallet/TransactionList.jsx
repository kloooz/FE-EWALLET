import React from 'react'
import TransactionItem from './TransactionItem'

export default function TransactionList({ items = [] }) {
  if (!items.length) {
    return (
      <div className="mt-4 bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No transactions yet</p>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Top up your balance to start making transactions</p>
      </div>
    )
  }

  return (
    <div className="mt-4 bg-white rounded-2xl shadow-sm p-3">
      <div className="space-y-0">
        {items.map((it) => (
          <TransactionItem key={it.id || it.txId || JSON.stringify(it)} item={it} />
        ))}
      </div>
    </div>
  )
}
