'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import styles from './Cart.module.css'

export default function EmptyCart() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>
        <ShoppingBag size={64} />
      </div>
      <h2 className={styles.emptyTitle}>Tu bolsa está vacía</h2>
      <p className={styles.emptyText}>
        Parece que aún no has añadido nada a tu bolsa. ¡Explora nuestra tienda y apoya una gran causa!
      </p>
      <Link href="/tienda" className={styles.emptyBtn}>
        Ir a la tienda
      </Link>
    </div>
  )
}
