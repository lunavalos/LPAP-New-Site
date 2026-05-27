'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import styles from './Checkout.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function OrderSummary() {
  const { items, totalPrice } = useCart()
  const [shipping, setShipping] = useState(180)

  useEffect(() => {
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
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>Tu Pedido</h3>
      
      <div className={styles.itemsList}>
        {items.map((item, i) => (
          <div key={i} className={styles.itemRow}>
            <div className={styles.itemImg}>
              {item.imageUrl ? (
                <img src={item.imageUrl.startsWith('http') ? item.imageUrl : `${PAYLOAD_URL}${item.imageUrl}`} alt="" />
              ) : (
                <div className={styles.placeholder} />
              )}
              <span className={styles.qtyBadge}>{item.quantity}</span>
            </div>
            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{item.title}</p>
              {item.variant && <span className={styles.itemVariant}>{item.variant.name}</span>}
            </div>
            <p className={styles.itemPrice}>{format(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className={styles.totalsSection}>
        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>{format(totalPrice)}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Envío</span>
          <span>{format(shipping)}</span>
        </div>
        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
          <span>Total</span>
          <span>{format(grandTotal)}</span>
        </div>
      </div>
    </div>
  )
}
