'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import styles from '../login/Auth.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const redirect = searchParams.get('redirect') || '/app'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`${PAYLOAD_URL}/api/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.errors?.[0]?.message || 'Error al crear la cuenta')
      
      // Auto login after register
      await login({ email: formData.email, password: formData.password })
      router.push(redirect)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>Únete a la causa y gestiona tus pedidos</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Nombre Completo</label>
            <input 
              required 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="Juan Pérez"
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              placeholder="tu@email.com"
            />
          </div>
          
          <div className={styles.field}>
            <label>Contraseña</label>
            <input 
              type="password" 
              required 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              placeholder="••••••••"
            />
          </div>

          <div className={styles.field}>
            <label>Confirmar Contraseña</label>
            <input 
              type="password" 
              required 
              value={formData.confirmPassword} 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              placeholder="••••••••"
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <span>¿Ya tienes cuenta?</span>
          <Link href={`/login${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}>
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
