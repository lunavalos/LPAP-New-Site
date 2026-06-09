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

        // Extraer los datos del formulario para enviarlos a Stripe
        const form = formRef.current
        const formData = new FormData(form)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const street = formData.get('street') as string
        const city = formData.get('city') as string
        const state = formData.get('state') as string
        const zipCode = formData.get('zipCode') as string

        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
          confirmParams: {
            return_url: `${window.location.origin}/checkout/success`,
            payment_method_data: {
              billing_details: {
                name: name || undefined,
                email: email || undefined,
                phone: phone || undefined,
                address: {
                  line1: street || undefined,
                  city: city || undefined,
                  state: state || undefined,
                  postal_code: zipCode || undefined,
                  country: 'MX',
                }
              }
            }
          }
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
            fields: {
              billingDetails: {
                name: 'never',
                email: 'never',
                phone: 'never',
                address: 'never',
              }
            }
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
