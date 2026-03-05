import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()
  const stored = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token && !stored) return <Navigate to="/login" replace />
  return children
}
