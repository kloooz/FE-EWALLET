import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoUrl from '../assets/danaku-logo.svg'

export default function MainLayout({ children, user }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 md:py-10">
      <div className="w-full bg-transparent max-w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="DANAKU" className="w-10 h-10" />
            <div>
              <div className="text-lg font-bold">DANAKU</div>
              <div className="text-xs text-slate-500">Your digital wallet</div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 md:gap-3">
            <button onClick={() => navigate('/pay-qr')} className="text-sm border border-slate-200 bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-sm font-medium hover:bg-blue-700 transition">Pay with QR</button>
            <Link to="/dashboard" className="text-sm border border-slate-200 text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition">Home</Link>
            <Link to="/vouchers" className="text-sm border border-slate-200 text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition">Vouchers</Link>
            <Link to="/transactions" className="text-sm border border-slate-200 text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition">Transactions</Link>
            <Link to="/profile" className="text-sm border border-slate-200 text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition">Profile</Link>
            <Link to="/about" className="text-sm border border-slate-200 text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition">About</Link>
            <button onClick={logout} className="text-sm border border-red-200 text-red-600 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:bg-red-50 font-medium transition">Logout</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 w-full min-h-[500px]">
          {children}
        </div>

        <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-sm text-slate-500 pb-4">
          <p>&copy; {new Date().getFullYear()} DANAKU. All rights reserved.</p>
          <div className="mt-2 text-xs flex justify-center gap-4">
            <Link to="/dashboard" className="hover:text-slate-800">Home</Link>
            <Link to="/vouchers" className="hover:text-slate-800">Vouchers</Link>
            <Link to="/transactions" className="hover:text-slate-800">Transactions</Link>
            <Link to="/profile" className="hover:text-slate-800">Profile</Link>
            <Link to="/about" className="hover:text-slate-800">About</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
