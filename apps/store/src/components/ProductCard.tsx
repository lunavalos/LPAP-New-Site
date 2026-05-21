import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  title: string
  price: number
  slug: string
  imageUrl?: string | null
  description?: string
  category?: string
  tags?: string[]
}

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function ProductCard({ title, price, slug, imageUrl, description, category, tags }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(price || 0)

  const resolvedImg = imageUrl
    ? imageUrl.startsWith('http') ? imageUrl : `${PAYLOAD_URL}${imageUrl}`
    : null

  return (
    <div className={styles.card}>
      {/* Top – imagen como fondo */}
      <div
        className={styles.cardTop}
        style={resolvedImg ? { backgroundImage: `url(${resolvedImg})` } : undefined}
      >
        {!resolvedImg && (
          <div className={styles.imagePlaceholder}>
            <ShoppingCart size={48} color="rgba(0,0,0,0.15)" />
          </div>
        )}
      </div>

      {/* Bottom – contenido blanco */}
      <div className={styles.cardBottom}>
        <div className={styles.titleRow}>
          <h3 className={styles.productTitle}>{title}</h3>
          <span className={styles.priceTag}>{formattedPrice}</span>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {category && (
          <div className={styles.tagsRow}>
            <span className={styles.categoryTag}>{category}</span>
          </div>
        )}

        <Link href={`/tienda/${slug}`} className={styles.addToCart}>
          Ver detalles
        </Link>
      </div>
    </div>
  )
}
