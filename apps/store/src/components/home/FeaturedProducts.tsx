'use client'

import React, { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import styles from './FeaturedProducts.module.css'

interface Product {
  title: string
  price: number
  slug: string
  images?: { image?: { url?: string } }[]
  description?: string
  category?: { title: string } | string
}

interface FeaturedProductsProps {
  products?: Product[]
}

const FALLBACK: Product[] = [
  {
    title: 'Bolsa Ecológica Solidaria LPAP',
    price: 150,
    slug: 'bolsa-ecologica-lpap',
    description: 'Bolsa 100% de algodón con el diseño del Ángel Luis Pablo. Reutilizable y con causa.',
    category: 'Accesorios',
  },
  {
    title: 'Termo Guerrero Acero Inoxidable',
    price: 350,
    slug: 'termo-guerrero',
    description: 'Termo de doble pared que conserva temperatura. Tu compra paga quimioterapias.',
    category: 'Hogar',
  },
  {
    title: 'Pin Conmemorativo Luis Pablo',
    price: 60,
    slug: 'pin-angel',
    description: 'Pin metálico esmaltado de la silueta de nuestro ángel fundador. Edición limitada.',
    category: 'Coleccionables',
  },
  {
    title: 'Libro: Historias de Guerreros',
    price: 220,
    slug: 'libro-esperanza',
    description: 'Testimonios reales de familias y niños que luchan contra el cáncer infantil en México.',
    category: 'Literatura',
  },
  {
    title: 'Cubrebocas Reutilizable Con Causa',
    price: 80,
    slug: 'cubrebocas-solidario',
    description: 'Cubrebocas cómodo y lavable conmemorativo de LPAP. Protección con propósito.',
    category: 'Salud',
  },
]

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const list = products.length > 0 ? products : FALLBACK

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 354
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  // Auto-scroll: cada 3s, pausa cuando el usuario pasa el cursor
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 354, behavior: 'smooth' })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [paused])

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>
              Cada compra financia <br />
              <span className={styles.titleAccent}>tratamientos de vida</span>
            </h2>
            <p className={styles.headerText}>
              Adquiriendo nuestros productos con causa apoyas de forma directa a niños y niñas en sus tratamientos, medicamentos y quimioterapias. Cada artículo en esta tienda solidaria ha sido seleccionado con amor para financiar esperanza.
            </p>
          </div>
        </div>

        {/* Carousel Area */}
        <div className={styles.carouselWrapper}>
          {/* Flecha izquierda */}
          <button
            className={`${styles.navBtn} ${styles.navLeft}`}
            onClick={() => scroll('left')}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Track */}
          <div
            className={styles.carouselContainer}
            ref={scrollRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {list.map((p, i) => {
              const raw = p.images?.[0]?.image?.url
              const imgUrl = raw
                ? (raw.startsWith('http') ? raw : `${PAYLOAD_URL}${raw}`)
                : null
              const cat = typeof p.category === 'object'
                ? p.category?.title
                : (p.category || 'Solidaridad')

              return (
                <ProductCard
                  key={i}
                  title={p.title}
                  price={p.price}
                  slug={p.slug}
                  imageUrl={imgUrl}
                  description={p.description}
                  category={cat}
                />
              )
            })}
          </div>

          {/* Flecha derecha */}
          <button
            className={`${styles.navBtn} ${styles.navRight}`}
            onClick={() => scroll('right')}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
