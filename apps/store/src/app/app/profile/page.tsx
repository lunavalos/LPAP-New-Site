'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { User, Phone, Mail, Save } from 'lucide-react'
import styles from '../Dashboard.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function ProfilePage() {
  const { user, refreshUser, getAuthHeaders } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }))
    }
  }, [user])
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const body: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }
      
      if (formData.password.trim() !== '') {
        if (formData.password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres')
        }
        body.password = formData.password
      }

      const res = await fetch(`${PAYLOAD_URL}/api/customers/${user?.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.errors?.[0]?.message || 'Error al actualizar el perfil')
      }
      
      await refreshUser()
      // Clear password field after successful update
      setFormData(prev => ({ ...prev, password: '' }))
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pageContent}>
      <header className={styles.header}>
        <h1 className={styles.welcomeTitle}>Mi Perfil</h1>
        <p className={styles.welcomeSubtitle}>Gestiona tu información personal y de contacto.</p>
      </header>

      <div className={styles.profileCard}>
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Datos Personales</h3>
            
            <div className={styles.field}>
              <label><User size={14} /> Nombre Completo</label>
              <input 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Juan Pérez"
              />
            </div>

            <div className={styles.field}>
              <label><Mail size={14} /> Correo Electrónico</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="juan@ejemplo.com"
              />
              <p className={styles.hint}>Nota: Si cambias tu correo, deberás usar el nuevo para iniciar sesión.</p>
            </div>

            <div className={styles.field}>
              <label><Phone size={14} /> Teléfono</label>
              <input 
                type="tel" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                placeholder="55 1234 5678"
              />
            </div>

            <div className={styles.field}>
              <label><Save size={14} /> Nueva Contraseña</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                placeholder="Ingresa una nueva contraseña si deseas cambiarla"
              />
              <p className={styles.hint}>Mínimo 6 caracteres. Déjalo en blanco si no deseas cambiarla.</p>
            </div>
          </div>

          {message && (
            <div className={`${styles.alert} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <Save size={18} />
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
