'use client'

import React, { useEffect, useRef } from 'react'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'
import Link from 'next/link'
import styles from './Cart.module.css'

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, totalPrice, totalItems } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closeCart])

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={closeCart} />
      
      {/* Drawer */}
      <div className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ''}`} ref={drawerRef}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitle}>
            <ShoppingBag size={20} />
            <h3>Tu Bolsa ({totalItems})</h3>
          </div>
          <button onClick={closeCart} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.drawerContent}>
          {items.length === 0 ? (
            <div className={styles.drawerEmpty}>
              <p>No hay productos en tu bolsa</p>
              <Link href="/tienda" onClick={closeCart} className={styles.continueShopping}>
                Ir a comprar
              </Link>
            </div>
          ) : (
            <div className={styles.drawerItems}>
              {items.map((item, idx) => (
                <CartItem key={`${item.id}-${item.variant?.sku || idx}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.drawerFooter}>
            <div className={styles.drawerTotal}>
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalPrice)}</span>
            </div>
            <p className={styles.footerNote}>Envío e impuestos calculados en el checkout.</p>
            
            <div className={styles.drawerActions}>
              <Link href="/cart" onClick={closeCart} className={styles.viewCartBtn}>
                Ver Bolsa
              </Link>
              <Link href="/checkout" onClick={closeCart} className={styles.checkoutBtnDrawer}>
                Pagar <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
