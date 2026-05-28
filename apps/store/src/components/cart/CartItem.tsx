'use client'

import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import styles from './Cart.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

interface CartItemProps {
  item: any
  layout?: 'drawer' | 'page'
}

export default function CartItem({ item, layout = 'drawer' }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(item.price)

  const subtotal = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(item.price * item.quantity)

  const imageUrl = item.imageUrl 
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${PAYLOAD_URL}${item.imageUrl}`)
    : null

  return (
    <div className={`${styles.item} ${layout === 'page' ? styles.itemPage : ''}`}>
      <div className={styles.itemImage}>
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      
      <div className={styles.itemInfo}>
        <div className={styles.itemHeader}>
          <h4 className={styles.itemTitle}>{item.title}</h4>
          <button 
            className={styles.removeBtn} 
            onClick={() => removeItem(item.id, item.variant?.name)}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        {item.variant && (
          <p className={styles.itemVariant}>{item.variant.name}</p>
        )}
        
        <div className={styles.itemFooter}>
          <div className={styles.quantity}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.name)}>
              <Minus size={14} />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.name)}>
              <Plus size={14} />
            </button>
          </div>
          <div className={styles.itemPrice}>
            {layout === 'page' && <span className={styles.unitPrice}>{formattedPrice} x {item.quantity}</span>}
            <span className={styles.totalPrice}>{subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
