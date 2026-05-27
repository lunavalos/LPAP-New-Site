'use client'

import React, { useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import { StripePreviewForm } from './StripeWrapper'

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
const STRIPE_READY = PUBLISHABLE_KEY.startsWith('pk_') &&
  !PUBLISHABLE_KEY.includes('REEMPLAZA') &&
  PUBLISHABLE_KEY.length > 30

interface Props {
  onError: (msg: string) => void
  isSubmitting: boolean
  setIsSubmitting: (v: boolean) => void
  formRef: React.RefObject<HTMLFormElement | null>
}

export default function StripePaymentSection({ onError, isSubmitting, setIsSubmitting, formRef }: Props) {
  const [StripeHooks, setStripeHooks] = useState<any>(null)
  const [ready, setReady] = useState(false)

  // Carga dinámica de hooks de Stripe solo cuando hay llaves
  useEffect(() => {
    if (!STRIPE_READY) return
    import('@stripe/react-stripe-js').then(m => {
      setStripeHooks({ useStripe: m.useStripe, useElements: m.useElements, PaymentElement: m.PaymentElement })
    })
  }, [])

  // Si no hay Stripe configurado, mostrar vista previa
  if (!STRIPE_READY) {
    return <StripePreviewForm />
  }

  // Mientras cargan los hooks
  if (!StripeHooks) return null

  return <StripeInner StripeHooks={StripeHooks} onError={onError} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} formRef={formRef} />
}

function StripeInner({ StripeHooks, onError, isSubmitting, setIsSubmitting, formRef }: any) {
  const stripe = StripeHooks.useStripe()
  const elements = StripeHooks.useElements()
  const PaymentElement = StripeHooks.PaymentElement
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (formRef.current) {
      (formRef.current as any).__stripeConfirm = async () => {
        if (!stripe || !elements) return null
        setIsSubmitting(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
        })

        setIsSubmitting(false)

        if (error) {
          onError(error.message || 'Error al procesar el pago')
          return null
        }

        if (paymentIntent?.status === 'succeeded') {
          return paymentIntent.id
        }

        onError('El pago no fue completado. Inténtalo de nuevo.')
        return null
      }
    }
  }, [stripe, elements, formRef, onError, setIsSubmitting])

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        Método de Pago
      </h3>
      <div className={styles.stripeNotice}>
        <span className={styles.lockIcon}>🔒</span>
        <span>Pago seguro con cifrado SSL · Procesado por <strong>Stripe</strong></span>
      </div>
      <div className={styles.paymentElementWrap}>
        <PaymentElement
          onReady={() => setReady(true)}
          options={{
            layout: 'accordion',
            defaultValues: { billingDetails: { address: { country: 'MX' } } },
          }}
        />
        {!ready && (
          <div className={styles.stripeLoader}>
            <div className={styles.spinner} />
            <span>Cargando métodos de pago...</span>
          </div>
        )}
      </div>
    </div>
  )
}
