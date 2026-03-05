import React from 'react'

export default function Input({ label, error, ...rest }) {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm md:text-base font-medium mb-1">{label}</label>}
      <input
        className={`w-full rounded-xl border px-3 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-fin-blue-1 ${error ? 'border-red-300' : 'border-slate-200'}`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
