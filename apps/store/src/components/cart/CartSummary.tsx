'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import styles from './Cart.module.css'

export default function CartSummary() {
  const { totalPrice } = useCart()

  const format = (val: number) => new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(val)

  const shipping = 0 // Placeholder
  const taxes = totalPrice * 0.16 // Example tax
  const grandTotal = totalPrice + shipping

  return (
    <div className={styles.summary}>
      <h3 className={styles.summaryTitle}>Resumen de compra</h3>
      
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>{format(totalPrice)}</span>
      </div>
      
      <div className={styles.summaryRow}>
        <span>Envío</span>
        <span className={styles.free}>Gratis</span>
      </div>
      
      <div className={styles.summaryRow}>
        <span>IVA (16%)</span>
        <span>{format(taxes)}</span>
      </div>
      
      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>Total</span>
        <span>{format(grandTotal)}</span>
      </div>

      <Link href="/checkout" className={styles.checkoutBtn}>
        Finalizar Compra
      </Link>

      <p className={styles.secureText}>
        🔒 Pago seguro procesado por Stripe
      </p>
    </div>
  )
}
