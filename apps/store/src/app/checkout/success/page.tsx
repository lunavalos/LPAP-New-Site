'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import styles from './Success.module.css'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className={styles.successPage}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <CheckCircle size={80} />
        </div>
        
        <h1 className={styles.title}>¡Pedido Realizado con Éxito!</h1>
        <p className={styles.subtitle}>
          Gracias por tu compra. Tu apoyo hace una gran diferencia en la vida de muchos niños.
        </p>

        {orderId && (
          <div className={styles.orderNumber}>
            <span>Número de Pedido:</span>
            <strong>#{orderId}</strong>
          </div>
        )}

        <div className={styles.info}>
          <p>Hemos enviado un correo de confirmación a tu cuenta con los detalles del pedido.</p>
          <p className={styles.statusNote}>
            Status: <strong>Pendiente de Pago</strong> (Simulado)
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/tienda" className={styles.primaryBtn}>
            <ShoppingBag size={20} /> Seguir comprando
          </Link>
          <Link href="/" className={styles.secondaryBtn}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
