import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import PromoDetail from '../pages/PromoDetail'
import PayWithQR from '../pages/PayWithQR'
import CreatePin from '../pages/CreatePin'
import Profile from '../pages/Profile'
import Transactions from '../pages/Transactions'
import PaymentCallback from '../pages/PaymentCallback'
import TransferSuccess from '../pages/TransferSuccess'
import About from '../pages/About'
import QrSuccess from '../pages/QrSuccess'
import Vouchers from '../pages/Vouchers'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay-qr"
        element={
          <ProtectedRoute>
            <PayWithQR />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-pin"
        element={
          <ProtectedRoute>
            <CreatePin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/promo/:id"
        element={
          <ProtectedRoute>
            <PromoDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vouchers"
        element={
          <ProtectedRoute>
            <Vouchers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:status"
        element={
          <ProtectedRoute>
            <PaymentCallback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer/success"
        element={
          <ProtectedRoute>
            <TransferSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay-qr/success"
        element={
          <ProtectedRoute>
            <QrSuccess />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
