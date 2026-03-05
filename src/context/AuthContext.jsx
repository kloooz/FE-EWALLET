import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const login = async (credentials) => {
    try {
      const res = await api.post('/login', credentials)
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log('[auth] login response', res?.data)
      }
      const t = res?.data?.data?.token || null
      if (t) {
        localStorage.setItem('token', t)
        setToken(t)
      }
      return res
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[auth] login error', err?.response?.data || err.message)
      throw err
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
