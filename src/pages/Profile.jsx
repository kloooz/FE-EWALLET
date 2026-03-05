import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../api/axios'
import { formatRupiah } from '../utils/formatRupiah'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const res = await api.get('/profile')
        const userData = res?.data?.data?.user ?? res?.data?.data ?? res?.data ?? null
        if (mounted) {
          setUser(userData)
          setEditForm({
            username: userData?.username || '',
            email: userData?.email || '',
            phone: userData?.phone || ''
          })

          // Fetch balance separately
          try {
            const balRes = await api.get('/balance')
            setBalance(balRes?.data?.data?.balance ?? 0)
          } catch (e) { }
        }
      } catch (err) {
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchProfile()
    return () => { mounted = false }
  }, [])

  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({ username: '', email: '', phone: '' })
  const [updatingProfile, setUpdatingProfile] = useState(false)

  const [editPinMode, setEditPinMode] = useState(false)
  const [pinForm, setPinForm] = useState('')
  const [updatingPin, setUpdatingPin] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdatingProfile(true)
    try {
      const res = await api.put('/profile', editForm)
      setUser(res.data?.data?.user)
      setEditMode(false)
      alert('Profile updated successfully')
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setUpdatingProfile(false)
    }
  }

  const handleUpdatePin = async (e) => {
    e.preventDefault()
    if (pinForm.length !== 6) return alert('PIN must be 6 digits')
    setUpdatingPin(true)
    try {
      await api.post('/pin', { pin: pinForm })
      setEditPinMode(false)
      setPinForm('')
      alert('PIN updated successfully')
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update PIN')
    } finally {
      setUpdatingPin(false)
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm md:text-base font-semibold">Account</h3>
            {!editMode && (
              <button onClick={() => setEditMode(true)} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Edit</button>
            )}
          </div>

          {loading ? (
            <div className="text-sm text-slate-500">Loading...</div>
          ) : editMode ? (
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-slate-500">Username</label>
                <input required value={editForm.username} onChange={e => setEditForm({ ...editForm, username: e.target.value })} className="w-full border rounded px-3 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Email</label>
                <input type="email" required value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full border rounded px-3 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Phone</label>
                <input required value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full border rounded px-3 py-1.5 text-sm" />
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setEditMode(false)} className="px-3 py-1.5 bg-gray-100 text-sm rounded">Cancel</button>
                <button type="submit" disabled={updatingProfile} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded">{updatingProfile ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          ) : (
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex shrink-0 items-center justify-center text-slate-400">Avatar</div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold truncate">{user?.username ?? '—'}</div>
                <div className="text-sm text-slate-600 truncate">{user?.email ?? '—'}</div>
                <div className="text-sm text-slate-600 truncate">{user?.phone ?? '—'}</div>
                <div className="mt-2 text-sm">Balance: <span className="font-medium text-blue-700">{formatRupiah(balance)}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="text-sm md:text-base font-semibold mb-2">Security</h3>
            {editPinMode ? (
              <form onSubmit={handleUpdatePin} className="flex flex-col gap-3">
                <label className="text-xs text-slate-500">Enter New 6-Digit PIN</label>
                <input inputMode="numeric" pattern="[0-9]*" maxLength={6} required value={pinForm} onChange={e => setPinForm(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} className="w-full border rounded px-3 py-1.5 text-sm tracking-widest" />
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setEditPinMode(false)} className="px-3 py-1.5 bg-gray-100 text-sm rounded">Cancel</button>
                  <button type="submit" disabled={updatingPin} className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded">{updatingPin ? 'Saving...' : 'Update PIN'}</button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Payment PIN</div>
                  <div className="text-xs text-slate-500">Used for authorizing transactions</div>
                </div>
                <button onClick={() => setEditPinMode(true)} className="text-xs bg-gray-100 px-3 py-1.5 rounded font-medium">Change PIN</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
