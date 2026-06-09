'use client'

import React, { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import styles from './Checkout.module.css'

// ── Carga Stripe de forma dinámica solo cuando hay llave pública real ─────────
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
// Consideramos Stripe listo solo si la clave parece real (no el placeholder)
const STRIPE_READY = PUBLISHABLE_KEY.startsWith('pk_') &&
  !PUBLISHABLE_KEY.includes('REEMPLAZA') &&
  PUBLISHABLE_KEY.length > 30

interface Props {
  children: React.ReactNode
  shipping: number
}

// ── Formulario de vista previa (sin Stripe real) ──────────────────────────────
export function StripePreviewForm() {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        Método de Pago
      </h3>

      <div className={styles.stripeNotice}>
        <span className={styles.lockIcon}>🔒</span>
        <span>Pago seguro con cifrado SSL · Procesado por <strong>Stripe</strong></span>
      </div>

      <div className={styles.previewCard}>
        <div className={styles.previewBadge}>Vista previa — Stripe por configurar</div>

        {/* Número de tarjeta */}
        <div className={styles.field} style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
            Número de tarjeta
          </label>
          <div className={styles.mockInput}>
            <span className={styles.mockValue}>1234  5678  9012  3456</span>
            <div className={styles.cardBrands}>
              <img src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg" alt="Visa" height={20} />
              <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="MC" height={20} />
            </div>
          </div>
        </div>

        {/* Vencimiento + CVC */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div className={styles.field}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
              Fecha de vencimiento
            </label>
            <div className={styles.mockInput}>
              <span className={styles.mockValue}>MM / AA</span>
            </div>
          </div>
          <div className={styles.field}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
              Código de seguridad
            </label>
            <div className={styles.mockInput}>
              <span className={styles.mockValue}>CVC</span>
              <span style={{ fontSize: 18, color: '#aaa' }}>💳</span>
            </div>
          </div>
        </div>

        {/* Nombre en tarjeta */}
        <div className={styles.field}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
            Nombre en la tarjeta
          </label>
          <div className={styles.mockInput}>
            <span className={styles.mockValue}>Nombre Apellido</span>
          </div>
        </div>

        <div className={styles.paymentMethods}>
          <span className={styles.payMethodLabel}>También aceptamos:</span>
          <div className={styles.payMethodIcons}>
            <span className={styles.payMethodChip}>💳 Débito</span>
            <span className={styles.payMethodChip}>🏦 Transferencia</span>
            <span className={styles.payMethodChip}>📱 OXXO</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Wrapper real con Stripe Elements ─────────────────────────────────────────
export default function StripeWrapper({ children, shipping }: Props) {
  const { items, totalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Si no hay llave configurada, renderizar directamente sin Stripe
  if (!STRIPE_READY) {
    return <>{children}</>
  }

  // Create PaymentIntent when cart has items
  useEffect(() => {
    if (items.length === 0) return
    const controller = new AbortController()
    const total = totalPrice + shipping

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total, currency: 'mxn', metadata: { itemCount: items.length } }),
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) setClientSecret(data.clientSecret)
        else setError(data.error || 'No se pudo inicializar el pago')
      })
      .catch(err => { if (err.name !== 'AbortError') setError('Error de conexión') })

    return () => controller.abort()
  }, [items, totalPrice, shipping])

  if (error) {
    // Si Stripe falla (llave inválida, sin configurar, etc.) → mostrar preview
    return <>{children}</>
  }

  if (!clientSecret) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px', color: '#888', fontSize: '15px', gap: '12px', alignItems: 'center' }}>
        <span style={{ display: 'inline-block', width: 22, height: 22, border: '3px solid #f4852b', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        Iniciando pasarela de pago...
      </div>
    )
  }

  // Carga dinámica de Stripe solo cuando hay clientSecret
  return (
    <StripeElementsWrapper clientSecret={clientSecret}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { clientSecret } as any)
        }
        return child
      })}
    </StripeElementsWrapper>
  )
}

// ── Sub-componente con import dinámico de Stripe ──────────────────────────────
function StripeElementsWrapper({ clientSecret, children }: { clientSecret: string; children: React.ReactNode }) {
  const [StripeComponents, setStripeComponents] = useState<any>(null)

  useEffect(() => {
    Promise.all([
      import('@stripe/stripe-js').then(m => m.loadStripe(PUBLISHABLE_KEY)),
      import('@stripe/react-stripe-js'),
    ]).then(([stripePromise, stripeReact]) => {
      setStripeComponents({ stripePromise, Elements: stripeReact.Elements })
    })
  }, [])

  if (!StripeComponents) return null

  const { stripePromise, Elements } = StripeComponents

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#f4852b',
            colorBackground: '#ffffff',
            colorText: '#111111',
            colorDanger: '#ff4d4f',
            fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
            spacingUnit: '5px',
            borderRadius: '12px',
          },
          rules: {
            '.Input': { border: '2px solid #f0f0f0', padding: '14px 18px', fontSize: '15px' },
            '.Input:focus': { border: '2px solid #f4852b', boxShadow: '0 0 0 3px rgba(244,133,43,0.15)' },
            '.Label': { fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888888' },
          },
        },
        locale: 'es-419',
      }}
    >
      {children}
    </Elements>
  )
}
