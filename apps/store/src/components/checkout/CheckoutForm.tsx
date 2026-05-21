'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import styles from './Checkout.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function CheckoutForm() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, getAuthHeaders } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México',
    specifications: '',
  })

  // Pre-fill user data if authenticated
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
      
      // If user has a default address, pre-fill it too
      const defaultAddr = user.addresses?.find((a: any) => a.isDefault) || user.addresses?.[0]
      if (defaultAddr) {
        setFormData(prev => ({
          ...prev,
          street: defaultAddr.street || prev.street,
          city: defaultAddr.city || prev.city,
          state: defaultAddr.state || prev.state,
          zipCode: defaultAddr.zipCode || prev.zipCode,
          specifications: defaultAddr.specifications || prev.specifications,
        }))
      }
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          specifications: formData.specifications,
        },
        items: items.map(item => ({
          product: item.id,
          title: item.title,
          slug: item.slug,
          imageUrl: item.imageUrl,
          variantName: item.variant?.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: totalPrice,
        taxes: totalPrice * 0.16,
        total: totalPrice * 1.16,
        status: 'pending',
        account: user?.id || null, // Associate with customer account if logged in
      }

      const res = await fetch(`${PAYLOAD_URL}/api/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      })

      if (!res.ok) throw new Error('Error al crear el pedido')

      const result = await res.json()
      
      // Clear cart and redirect
      clearCart()
      router.push(`/checkout/success?orderId=${result.doc.id}`)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Información de contacto</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Nombre completo</label>
            <input name="name" required value={formData.name} onChange={handleChange} placeholder="Ej. Juan Pérez" />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="juan@ejemplo.com" />
          </div>
          <div className={styles.field}>
            <label>Teléfono</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="55 1234 5678" />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Dirección de envío</h3>
        <div className={styles.grid}>
          <div className={`${styles.field} ${styles.full}`}>
            <label>Calle y número</label>
            <input name="street" required value={formData.street} onChange={handleChange} placeholder="Av. Siempre Viva 123" />
          </div>
          <div className={styles.field}>
            <label>Ciudad</label>
            <input name="city" required value={formData.city} onChange={handleChange} placeholder="Ciudad de México" />
          </div>
          <div className={styles.field}>
            <label>Estado</label>
            <input name="state" required value={formData.state} onChange={handleChange} placeholder="CDMX" />
          </div>
          <div className={styles.field}>
            <label>Código Postal</label>
            <input name="zipCode" required value={formData.zipCode} onChange={handleChange} placeholder="01234" />
          </div>
          <div className={styles.field}>
            <label>País</label>
            <input name="country" disabled value={formData.country} />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label>Especificaciones / Referencias (Opcional)</label>
            <textarea 
              name="specifications" 
              value={formData.specifications} 
              onChange={handleChange} 
              placeholder="Ej. Casa blanca con portón negro, entre calles X y Y..." 
              rows={3}
            />
          </div>
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.submitBtn} disabled={loading || items.length === 0}>
        {loading ? 'Procesando...' : 'Finalizar Pedido'}
      </button>
    </form>
  )
}
