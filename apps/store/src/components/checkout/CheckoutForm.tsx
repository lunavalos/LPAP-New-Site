'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import styles from './Checkout.module.css'
import StripePaymentSection from './StripePaymentSection'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

interface Props {
  shipping: number
  clientSecret?: string
}

export default function CheckoutForm({ shipping, clientSecret }: Props) {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, getAuthHeaders } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

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

  const createOrder = async (paymentIntentId: string, initialStatus: 'pending' | 'paid' = 'pending') => {
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
      shipping: shipping,
      taxes: 0,
      total: totalPrice + shipping,
      paymentStatus: initialStatus,
      deliveryStatus: initialStatus === 'paid' ? 'processing' : 'pending',
      account: user?.id || null,
      stripe: {
        paymentIntentId,
        paymentStatus: initialStatus === 'paid' ? 'succeeded' : 'pending',
      },
    }

    const res = await fetch(`${PAYLOAD_URL}/api/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    })

    if (!res.ok) throw new Error('Error al registrar el pedido')
    return res.json()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
      const stripeReady = key.startsWith('pk_') && !key.includes('REEMPLAZA') && key.length > 30
      const confirm = (formRef.current as any)?.__stripeConfirm

      let orderId: string | null = null

      if (stripeReady && confirm) {
        // 1. Crear la orden en Payload con estado 'pending' primero
        const paymentIntentId = clientSecret?.split('_secret_')[0] || ''
        const result = await createOrder(paymentIntentId, 'pending')
        orderId = result.doc.id

        // 2. Confirmar pago con Stripe
        const confirmedId = await confirm()
        if (!confirmedId) {
          // Error ya reportado por StripePaymentSection
          setLoading(false)
          return
        }
      } else {
        // Modo vista previa / sin Stripe configurado
        const result = await createOrder('', 'paid')
        orderId = result.doc.id
      }

      clearCart()
      router.push(`/checkout/success?orderId=${orderId}`)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      {/* ── Información de Contacto ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Información de contacto
        </h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Nombre completo</label>
            <input name="name" required value={formData.name} onChange={handleChange} placeholder="Nombre completo" />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
          </div>
          <div className={styles.field}>
            <label>Teléfono</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+52 55 0000 0000" />
          </div>
        </div>
      </div>

      {/* ── Dirección de Envío ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Dirección de envío
        </h3>

        {user?.addresses && user.addresses.length > 1 && (
          <div className={`${styles.field} ${styles.full}`} style={{ marginBottom: '24px' }}>
            <select
              onChange={(e) => {
                const idx = parseInt(e.target.value)
                if (!isNaN(idx) && user.addresses?.[idx]) {
                  const selectedAddr = user.addresses[idx]
                  setFormData(prev => ({
                    ...prev,
                    street: selectedAddr.street || '',
                    city: selectedAddr.city || '',
                    state: selectedAddr.state || '',
                    zipCode: selectedAddr.zipCode || '',
                    specifications: selectedAddr.specifications || '',
                  }))
                }
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #f0f0f0',
                fontSize: '14px',
                outline: 'none',
                background: '#fff',
                fontWeight: '600',
                color: '#333',
              }}
            >
              <option value="">-- Elige una dirección guardada --</option>
              {user.addresses.map((addr: any, idx: number) => (
                <option key={idx} value={idx}>
                  {addr.street}, {addr.city}, {addr.state} {addr.isDefault ? '(Principal)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

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

      <StripePaymentSection
        formRef={formRef}
        onError={(msg) => setError(msg)}
        isSubmitting={loading}
        setIsSubmitting={setLoading}
      />

      {error && <p className={styles.errorMessage}>⚠️ {error}</p>}

      <button type="submit" className={styles.submitBtn} disabled={loading || items.length === 0}>
        {loading ? (
          <span className={styles.btnLoading}>
            <span className={styles.btnSpinner} />
            Procesando pago...
          </span>
        ) : (
          `Pagar $${(totalPrice + shipping).toLocaleString('es-MX')} MXN`
        )}
      </button>

      <p className={styles.secureNote}>
        🔒 Tu información está protegida con cifrado de extremo a extremo
      </p>
    </form>
  )
}
