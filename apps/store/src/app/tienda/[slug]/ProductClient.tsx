'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, ChevronRight, Check } from 'lucide-react'
import styles from './ProductPage.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function ProductClient({ product }: { product: any }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const currentPrice = selectedVariant ? selectedVariant.price : product.price
  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(currentPrice)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: currentPrice,
      quantity: quantity,
      slug: product.slug,
      imageUrl: product.images?.[0]?.image?.url,
      variant: selectedVariant ? {
        name: selectedVariant.name,
        sku: selectedVariant.sku,
        price: selectedVariant.price
      } : undefined
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleSelectVariantAndAdd = (v: any) => {
    setSelectedVariant(v)
    addItem({
      id: product.id,
      title: product.title,
      price: v.price,
      quantity: quantity,
      slug: product.slug,
      imageUrl: product.images?.[0]?.image?.url,
      variant: {
        name: v.name,
        sku: v.sku,
        price: v.price
      }
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const activeImageUrl = product.images?.[activeImageIndex]?.image?.url || product.images?.[0]?.image?.url
  const mainImage = activeImageUrl 
    ? (activeImageUrl.startsWith('http') ? activeImageUrl : `${PAYLOAD_URL}${activeImageUrl}`)
    : null

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <span>Tienda</span>
          <ChevronRight size={14} />
          <span>{product.category?.title || 'Productos'}</span>
          <ChevronRight size={14} />
          <span className={styles.active}>{product.title}</span>
        </div>

        <div className={styles.productGrid}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
              {mainImage ? (
                <img src={mainImage} alt={product.title} className={styles.mainImage} />
              ) : (
                <div className={styles.imagePlaceholder}>No hay imagen disponible</div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((img: any, i: number) => {
                  const url = img?.image?.url
                  if (!url) return null
                  const src = url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
                  return (
                    <div 
                      key={i} 
                      className={`${styles.thumb} ${activeImageIndex === i ? styles.thumbActive : ''}`}
                      onClick={() => setActiveImageIndex(i)}
                    >
                      <img src={src} alt="" />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <span className={styles.categoryTag}>{product.category?.title}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>{formattedPrice}</p>
            
            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Selecciona una opción</h4>
                <div className={styles.variantsGrid}>
                  {product.variants.map((v: any, i: number) => (
                    <button 
                      key={i} 
                      type="button"
                      className={`${styles.variantBtn} ${selectedVariant?.name === v.name ? styles.variantActive : ''}`}
                      onClick={() => handleSelectVariantAndAdd(v)}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className={styles.purchaseActions}>
              <div className={styles.quantitySelector}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button 
                className={`${styles.addBtn} ${added ? styles.added : ''}`} 
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? (
                  <><Check size={20} /> ¡Añadido!</>
                ) : (
                  <><ShoppingBag size={20} /> Agregar a la bolsa</>
                )}
              </button>
            </div>

            <div className={styles.trustMarks}>
              <div className={styles.mark}>
                <strong>✓</strong> Envío seguro a todo México
              </div>
              <div className={styles.mark}>
                <strong>✓</strong> Tu compra apoya a niños con cáncer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
