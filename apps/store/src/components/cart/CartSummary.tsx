import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import styles from './Cart.module.css'

export default function CartSummary() {
  const { totalPrice } = useCart()
  const [shipping, setShipping] = useState(180)

  useEffect(() => {
    const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
    fetch(`${PAYLOAD_URL}/api/globals/store-settings`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.shippingPrice === 'number') {
          setShipping(data.shippingPrice)
        }
      })
      .catch(err => console.error('Error fetching shipping price:', err))
  }, [])

  const format = (val: number) => new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(val)

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
        <span>{format(shipping)}</span>
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
