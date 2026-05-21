'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { User, Phone, Mail, Save } from 'lucide-react'
import styles from '../Dashboard.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function ProfilePage() {
  const { user, refreshUser, getAuthHeaders } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch(`${PAYLOAD_URL}/api/customers/${user?.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Error al actualizar el perfil')
      
      await refreshUser()
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
                disabled 
                value={user?.email} 
                className={styles.disabledInput}
              />
              <p className={styles.hint}>El correo no puede ser modificado por seguridad.</p>
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
