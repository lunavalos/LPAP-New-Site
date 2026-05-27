'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { MapPin, Plus, Trash2, Home } from 'lucide-react'
import styles from '../Dashboard.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function AddressesPage() {
  const { user, refreshUser, getAuthHeaders } = useAuth()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México',
    isDefault: false,
    specifications: '',
  })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const currentAddresses = user?.addresses || []
      const updatedAddresses = [...currentAddresses, newAddress]
      
      const res = await fetch(`${PAYLOAD_URL}/api/customers/${user?.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ addresses: updatedAddresses }),
      })

      if (!res.ok) throw new Error('Error al añadir dirección')
      
      await refreshUser()
      setIsAdding(false)
      setNewAddress({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'México',
        isDefault: false,
        specifications: '',
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSetDefault = async (index: number) => {
    try {
      const updatedAddresses = user?.addresses?.map((addr: any, i: number) => ({
        ...addr,
        isDefault: i === index,
      }))
      
      const res = await fetch(`${PAYLOAD_URL}/api/customers/${user?.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ addresses: updatedAddresses }),
      })

      if (!res.ok) throw new Error('Error al establecer dirección principal')

      await refreshUser()
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta dirección?')) return
    
    try {
      const updatedAddresses = user?.addresses?.filter((_: any, i: number) => i !== index)
      
      await fetch(`${PAYLOAD_URL}/api/customers/${user?.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ addresses: updatedAddresses }),
      })

      await refreshUser()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.pageContent}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.welcomeTitle}>Mis Direcciones</h1>
          {!isAdding && (
            <button onClick={() => setIsAdding(true)} className={styles.addBtn}>
              <Plus size={18} /> Añadir Nueva
            </button>
          )}
        </div>
        <p className={styles.welcomeSubtitle}>Gestiona tus direcciones de envío para un checkout más rápido.</p>
      </header>

      {isAdding ? (
        <div className={styles.addressFormCard}>
          <h3 className={styles.sectionTitle}>Nueva Dirección</h3>
          <form onSubmit={handleAdd} className={styles.addressForm}>
            <div className={styles.fieldFull}>
              <label>Calle y número</label>
              <input required value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} placeholder="Av. Juárez 456" />
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>Ciudad</label>
                <input required value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} placeholder="Monterrey" />
              </div>
              <div className={styles.field}>
                <label>Estado</label>
                <input required value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} placeholder="Nuevo León" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>Código Postal</label>
                <input required value={newAddress.zipCode} onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})} placeholder="64000" />
              </div>
              <div className={styles.field}>
                <label>País</label>
                <input disabled value={newAddress.country} />
              </div>
            </div>
            <div className={styles.fieldFull}>
              <label>Especificaciones / Referencias</label>
              <textarea 
                value={newAddress.specifications} 
                onChange={(e) => setNewAddress({...newAddress, specifications: e.target.value})} 
                placeholder="Ej. Frente al parque..."
                rows={2}
              />
            </div>
            <div className={styles.checkboxField}>
              <input 
                type="checkbox" 
                id="isDefault" 
                checked={newAddress.isDefault} 
                onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})} 
              />
              <label htmlFor="isDefault">Establecer como dirección principal</label>
            </div>
            <div className={styles.formActions}>
              <button type="button" onClick={() => setIsAdding(false)} className={styles.cancelBtn}>Cancelar</button>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Dirección'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.addressGrid}>
          {user?.addresses && user.addresses.length > 0 ? (
            user.addresses.map((addr: any, i: number) => (
              <div key={i} className={`${styles.addressCard} ${addr.isDefault ? styles.defaultAddr : ''}`}>
                <div className={styles.addrHeader}>
                  <div className={styles.addrIcon}>
                    <MapPin size={20} />
                  </div>
                  {addr.isDefault && <span className={styles.badge}>Principal</span>}
                  <button onClick={() => handleDelete(i)} className={styles.deleteAddr}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className={styles.addrInfo}>
                  <p className={styles.addrStreet}>{addr.street}</p>
                  <p className={styles.addrCity}>{addr.city}, {addr.state}</p>
                  <p className={styles.addrZip}>{addr.zipCode}</p>
                  {addr.specifications && (
                    <p className={styles.addrSpecs}>Ref: {addr.specifications}</p>
                  )}
                </div>
                {!addr.isDefault && (
                  <div className={styles.addrActionsFooter}>
                    <button onClick={() => handleSetDefault(i)} className={styles.setDefaultBtn}>
                      Establecer como principal
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.emptyAddresses}>
              <Home size={48} />
              <p>No tienes direcciones guardadas.</p>
              <button onClick={() => setIsAdding(true)} className={styles.addBtnLarge}>
                Añadir mi primera dirección
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
