'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import EmptyCart from '@/components/cart/EmptyCart'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { items } = useCart()

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className={styles.pageTitle}>Tu Bolsa de Compra</h1>
        
        <div className={styles.cartGrid}>
          {/* List */}
          <div className={styles.itemsList}>
            {items.map((item, idx) => (
              <CartItem key={`${item.id}-${item.variant?.sku || idx}`} item={item} layout="page" />
            ))}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <CartSummary />
            <div className={styles.shippingNotice}>
              <p>🎁 Tu compra apoya directamente a niños en tratamiento contra el cáncer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
