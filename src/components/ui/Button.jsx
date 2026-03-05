import React from 'react'

export default function Button({ children, loading, disabled, className = '', ...rest }) {
  return (
    <button
      className={`w-full inline-flex items-center justify-center rounded-xl py-3 md:py-2 px-4 text-sm md:text-sm font-semibold shadow-sm disabled:opacity-60 disabled:cursor-not-allowed bg-fin-blue-1 text-white ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
