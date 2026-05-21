'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: string
  addresses?: any[]
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: any) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  getAuthHeaders: () => Record<string, string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
const TOKEN_KEY = 'lpap_customer_token'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Returns headers with Bearer token if available
  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) headers['Authorization'] = `JWT ${token}`
    }
    return headers
  }

  const refreshUser = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }
      const res = await fetch(`${PAYLOAD_URL}/api/customers/me`, {
        headers: { 'Authorization': `JWT ${token}`, 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (res.ok && data.user) {
        setUser(data.user)
      } else {
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      }
    } catch (e) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (credentials: any) => {
    const res = await fetch(`${PAYLOAD_URL}/api/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.errors?.[0]?.message || 'Error al iniciar sesión')

    // Store JWT in localStorage — never touches the admin cookie
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
    }
    setUser(data.user)
  }

  const logout = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
    if (token) {
      await fetch(`${PAYLOAD_URL}/api/customers/logout`, {
        method: 'POST',
        headers: { 'Authorization': `JWT ${token}`, 'Content-Type': 'application/json' },
      })
    }
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
