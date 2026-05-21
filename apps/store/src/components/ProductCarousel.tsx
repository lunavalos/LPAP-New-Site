'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'

/* ─── Tipos ─────────────────────────────────────────── */
interface Product {
  id?: string | number
  title: string
  price: number
  slug: string
  images?: { image?: { url?: string } }[]
  description?: string
  categories?: { title?: string }[]
}

interface ProductCarouselProps {
  products: Product[]
  title?: string
}

/* ─── Fallback cuando el CMS no tiene productos ─────── */
const FALLBACK: Product[] = [
  { title: 'Bolsa Ecológica LPAP', price: 150, slug: 'bolsa', description: 'Bolsa 100% reutilizable con diseño exclusivo de la Fundación LPAP. Cada compra ayuda a un niño guerrero.', categories: [{ title: 'Accesorios' }] },
  { title: 'Termo Guerrero', price: 350, slug: 'termo', description: 'Termo de acero inoxidable con el logo de LPAP. Ideal para mantenerte hidratado mientras apoyas la causa.', categories: [{ title: 'Hogar' }] },
  { title: 'Pin Ángel Luis Pablo', price: 50, slug: 'pin', description: 'Pin metálico conmemorativo con la imagen del Ángel Luis Pablo, fundador espiritual de la asociación.', categories: [{ title: 'Coleccionable' }] },
  { title: 'Libro de Esperanza', price: 200, slug: 'libro', description: 'Una colección de historias reales de niños que han luchado contra el cáncer con valentía y amor.', categories: [{ title: 'Literatura' }] },
  { title: 'Cubrebocas Solidario', price: 80, slug: 'cubrebocas', description: 'Cubrebocas reutilizable con diseño de la fundación. Tu compra financia tratamientos médicos.', categories: [{ title: 'Salud' }] },
  { title: 'Pulsera Esperanza', price: 120, slug: 'pulsera', description: 'Pulsera artesanal elaborada por familiares de niños guerreros. Símbolo de unión y esperanza.', categories: [{ title: 'Accesorios' }] },
]

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
const CARD_WIDTH = 310
const GAP = 24
const SCROLL_STEP = CARD_WIDTH + GAP

function resolveImg(url?: string) {
  if (!url) return null
  return url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(n)
}

/* ─── Tarjeta individual ─────────────────────────────── */
function Card({ product }: { product: Product }) {
  const imgUrl = resolveImg(product.images?.[0]?.image?.url)
  const category = product.categories?.[0]?.title

  return (
    <div style={{
      width: CARD_WIDTH,
      flexShrink: 0,
      borderRadius: 24,
      background: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      padding: '10px 10px 0',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.transform = 'translateY(-8px)'
      el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.16)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.transform = 'translateY(0)'
      el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'
    }}
    >
      {/* ── Top: imagen ── */}
      <div style={{
        background: imgUrl ? undefined : 'linear-gradient(145deg, #e8e8ee, #d8d8e8)',
        backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 200,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {!imgUrl && <ShoppingCart size={52} color="rgba(0,0,0,0.15)" />}
      </div>

      {/* ── Bottom: contenido ── */}
      <div style={{ padding: '18px 12px 18px', display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
        {/* Título + Precio */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111', lineHeight: 1.3, margin: 0, flex: 1 }}>
            {product.title}
          </h3>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--accent, #DC5DA3)',
            background: 'rgba(220,93,163,0.08)',
            border: '1px solid rgba(220,93,163,0.18)',
            padding: '4px 10px',
            borderRadius: 100,
            flexShrink: 0,
          }}>
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Descripción: 1 línea */}
        <p style={{
          fontSize: 13,
          color: '#777',
          lineHeight: 1.6,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}>
          {product.description || 'Producto con causa. El 100% apoya a niños con cáncer.'}
        </p>

        {/* Categoría */}
        {category && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#555',
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              padding: '3px 10px',
              borderRadius: 100,
            }}>
              {category}
            </span>
          </div>
        )}

        {/* Botón */}
        <Link
          href={`/tienda/${product.slug || product.id || '#'}`}
          style={{
            background: 'var(--accent, #DC5DA3)',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 800,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            display: 'block',
            marginTop: 'auto',
            boxShadow: '0 4px 14px rgba(220,93,163,0.25)',
            transition: 'background 0.25s, box-shadow 0.25s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = '#c44d91'
            el.style.boxShadow = '0 8px 20px rgba(220,93,163,0.35)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--accent, #DC5DA3)'
            el.style.boxShadow = '0 4px 14px rgba(220,93,163,0.25)'
          }}
        >
          Ver detalles
        </Link>
      </div>
    </div>
  )
}

/* ─── Carrusel principal ─────────────────────────────── */
export default function ProductCarousel({ products, title = 'Productos con Causa' }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [paused, setPaused] = useState(false)
  const display = products.length > 0 ? products : FALLBACK

  const scrollBy = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = dir === 'right' ? SCROLL_STEP : -SCROLL_STEP
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  // Auto-scroll: avanza cada 3s, se reinicia al llegar al final
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const tick = () => {
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' })
      }
    }

    if (!paused) {
      intervalRef.current = setInterval(tick, 3000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused])

  return (
    <section style={{ padding: '100px 0', background: '#fafafa', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: 2, color: 'var(--accent, #DC5DA3)', padding: '6px 16px',
              background: 'rgba(220,93,163,0.08)', border: '1px solid rgba(220,93,163,0.18)',
              borderRadius: 100, marginBottom: 12,
            }}>
              Nuestra Tienda
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#000', lineHeight: 1.1 }}>
              {title}
            </h2>
          </div>

          {/* Flechas en el header */}
          <div style={{ display: 'flex', gap: 10 }}>
            {(['left', 'right'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scrollBy(dir)}
                aria-label={dir === 'left' ? 'Anterior' : 'Siguiente'}
                style={{
                  width: 46, height: 46, borderRadius: '50%', border: '1.5px solid #ddd',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#333', transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget
                  b.style.background = 'var(--accent, #DC5DA3)'
                  b.style.color = '#fff'
                  b.style.borderColor = 'var(--accent, #DC5DA3)'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget
                  b.style.background = '#fff'
                  b.style.color = '#333'
                  b.style.borderColor = '#ddd'
                }}
              >
                {dir === 'left'
                  ? <ChevronLeft size={20} />
                  : <ChevronRight size={20} />
                }
              </button>
            ))}
          </div>
        </div>

        {/* Wrapper con flechas laterales */}
        <div style={{ position: 'relative' }}>
          {/* Flecha izquierda lateral */}
          <button
            onClick={() => scrollBy('left')}
            aria-label="Anterior"
            style={{
              position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: '#fff', border: '1.5px solid #ddd',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#333', zIndex: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              const b = e.currentTarget
              b.style.background = 'var(--accent, #DC5DA3)'
              b.style.color = '#fff'
              b.style.borderColor = 'var(--accent, #DC5DA3)'
            }}
            onMouseLeave={e => {
              const b = e.currentTarget
              b.style.background = '#fff'
              b.style.color = '#333'
              b.style.borderColor = '#ddd'
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Carrusel */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              display: 'flex',
              gap: GAP,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              paddingBottom: 12,
              paddingTop: 4,
              paddingLeft: 4,
              paddingRight: 4,
            }}
          >
            {display.map((p, i) => <Card key={i} product={p} />)}
          </div>

          {/* Flecha derecha lateral */}
          <button
            onClick={() => scrollBy('right')}
            aria-label="Siguiente"
            style={{
              position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: '#fff', border: '1.5px solid #ddd',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#333', zIndex: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              const b = e.currentTarget
              b.style.background = 'var(--accent, #DC5DA3)'
              b.style.color = '#fff'
              b.style.borderColor = 'var(--accent, #DC5DA3)'
            }}
            onMouseLeave={e => {
              const b = e.currentTarget
              b.style.background = '#fff'
              b.style.color = '#333'
              b.style.borderColor = '#ddd'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
