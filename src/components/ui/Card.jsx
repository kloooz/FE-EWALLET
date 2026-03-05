import React from 'react'

export default function Card({ children, className = '' }) {
  return <div className={`rounded-2xl shadow-sm bg-white p-4 ${className}`}>{children}</div>
}
