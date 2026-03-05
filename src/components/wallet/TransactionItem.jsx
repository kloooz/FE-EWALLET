import React from 'react'
import { formatRupiah } from '../../utils/formatRupiah'

export default function TransactionItem({ item }) {
  const typeStr = String(item?.type || '').toLowerCase();
  // amount may be string with decimals and sign
  const amountRaw = parseFloat(String(item?.amount || '0')) || 0;
  const amount = Math.abs(amountRaw);

  const isOutgoing = typeStr === 'transfer_out' || typeStr.includes('payment');
  const incoming = !isOutgoing && (typeStr.includes('topup') || typeStr === 'transfer_in' || amountRaw > 0);

  const dateLabel = item?.created_at ? new Date(item.created_at).toLocaleString() : '';
  const label = item?.description || (typeStr === 'topup' ? 'Top Up' : item?.description || (incoming ? 'Incoming' : 'Outgoing'));

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${incoming ? 'bg-green-50' : 'bg-red-50'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v20" stroke={incoming ? '#16a34a' : '#dc2626'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 9l7-7 7 7" stroke={incoming ? '#16a34a' : '#dc2626'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-xs text-slate-500">{dateLabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`text-sm font-semibold ${incoming ? 'text-green-600' : 'text-red-600'}`}>{incoming ? '+' : '-'}{formatRupiah(amount)}</div>
        {item?.snap_token && item?.status === 'pending' && (
          <button
            onClick={() => {
              const redirect = item?.redirect_url
              if (redirect) {
                window.location.href = redirect
              } else {
                window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${item.snap_token}`
              }
            }}
            className="ml-2 px-3 py-1 text-xs bg-blue-600 text-white rounded"
          >
            Complete Payment
          </button>
        )}
      </div>
    </div>
  )
}
