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
  const [inputValue, setInputValue] = React.useState(item.quantity.toString())

  React.useEffect(() => {
    setInputValue(item.quantity.toString())
  }, [item.quantity])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '' || /^\d+$/.test(val)) {
      setInputValue(val)
      const parsed = parseInt(val, 10)
      if (!isNaN(parsed) && parsed >= 1) {
        updateQuantity(item.id, parsed, item.variant?.sku)
      }
    }
  }

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10)
    if (isNaN(parsed) || parsed < 1) {
      setInputValue('1')
      updateQuantity(item.id, 1, item.variant?.sku)
    } else {
      setInputValue(parsed.toString())
      updateQuantity(item.id, parsed, item.variant?.sku)
    }
  }

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
            <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.sku)}>
              <Minus size={14} />
            </button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={styles.quantityInput}
            />
            <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.sku)}>
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
