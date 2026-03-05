import React from 'react'
import { formatRupiah } from '../../utils/formatRupiah'

export default function BalanceCard({ balance = 0 }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md">
      <div className="p-5 md:p-6 bg-gradient-to-r from-fin-blue-1 to-fin-blue-2 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm md:text-xs opacity-80">Wallet Balance</div>
            <div className="mt-2 text-2xl md:text-4xl font-bold">{formatRupiah(balance)}</div>
          </div>
          <div className="text-right text-sm md:text-base opacity-90">DANAKU</div>
        </div>
      </div>
    </div>
  )
}
