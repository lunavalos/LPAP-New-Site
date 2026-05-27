'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import RichText from './RichText'
import SupportForm from './SupportForm'
import styles from './Blocks.module.css'

interface BlocksProps {
  layout: any[]
  products?: any[]       // para el bloque archive (carousel)
  serverProducts?: any[] // pre-fetched desde el servidor para product-grid
}

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

function resolveUrl(url?: string) {
  if (!url) return null
  return url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
}

// ─── Archive / Product Carousel Block ────────────────────────────────────────
function ArchiveBlock({ block, products }: { block: any; products: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  let display = products
  if (block.populateBy === 'manual' && block.manualSelection?.length) {
    display = block.manualSelection
  }
  const limit = block.limit || 20
  display = display.slice(0, limit)

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 380 : -380, behavior: 'smooth' })
  }

  return (
    <section className={styles.archiveSection}>
      <div className={styles.container}>
        <div className={styles.archiveHeader}>
          <div>
            <span className={styles.sectionTag}>Nuestra Tienda</span>
            <h2 className={styles.sectionTitle}>{block.title || 'Productos con Causa'}</h2>
          </div>
          <div className={styles.carouselControls}>
            <button onClick={() => scroll('left')} className={styles.controlBtn} aria-label="Anterior">
              <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={() => scroll('right')} className={styles.controlBtn} aria-label="Siguiente">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.carouselWrap} ref={scrollRef}>
          {display.map((p: any, i: number) => {
            const rawUrl = p.images?.[0]?.image?.url
            return (
              <ProductCard
                key={i}
                title={p.title}
                price={p.price || 0}
                slug={p.slug}
                imageUrl={rawUrl ? resolveUrl(rawUrl) : null}
                description={p.description || p.excerpt}
                category={p.categories?.[0]?.title}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Product Grid Block ──────────────────────────────────────────────────────
function ProductGridSkeleton() {
  return (
    <section style={{ padding: '100px 0', background: '#fff' }}>
      <div className={styles.container}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '56px 40px'
        }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ borderRadius: 20, overflow: 'hidden' }}>
              <div style={{
                width: '100%', height: 280, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: 20,
              }} />
              <div style={{ padding: '20px 4px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ height: 16, width: '60%', borderRadius: 8, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                <div style={{ height: 14, width: '40%', borderRadius: 8, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                <div style={{ height: 20, width: '30%', borderRadius: 8, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', marginTop: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </section>
  )
}

function ProductGridBlock({ block, serverProducts }: { block: any; serverProducts?: any[] }) {
  // Si ya vienen productos del servidor, usarlos directamente sin fetch
  const [products, setProducts] = React.useState<any[]>(serverProducts || [])
  const [loading, setLoading] = React.useState(!serverProducts?.length)

  React.useEffect(() => {
    // Solo hacer fetch si no hay productos pre-cargados del servidor
    if (serverProducts && serverProducts.length > 0) return

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const params = new URLSearchParams()
    if (block.limit) params.append('limit', block.limit.toString())
    if (block.sort) params.append('sort', block.sort)
    if (block.featuredOnly) params.append('where[featured][equals]', 'true')
    if (block.categories?.length) {
      block.categories.forEach((cat: any) => {
        const catId = typeof cat === 'object' ? cat.id : cat
        params.append('where[category][in][]', catId)
      })
    }

    const url = `${PAYLOAD_URL}/api/products?depth=1&${params.toString()}`

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setProducts(data.docs || []))
      .catch(err => { if (err.name !== 'AbortError') console.error('[ProductGrid]', err) })
      .finally(() => { clearTimeout(timeout); setLoading(false) })

    return () => { controller.abort(); clearTimeout(timeout) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <ProductGridSkeleton />

  return (
    <section style={{ padding: '100px 0', background: '#fff' }}>
      <div className={styles.container}>
        {block.title && (
          <div style={{ marginBottom: 60, textAlign: 'center' }}>
            <h2 className={styles.sectionTitle}>{block.title}</h2>
          </div>
        )}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa', fontSize: 16 }}>
            No hay productos disponibles en este momento.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '56px 40px'
          }}>
            {products.map((p: any, i: number) => {
              const rawUrl = p.images?.[0]?.image?.url
              return (
                <ProductCard
                  key={i}
                  title={p.title}
                  price={p.price || 0}
                  slug={p.slug}
                  imageUrl={rawUrl ? resolveUrl(rawUrl) : null}
                  description={p.description || p.excerpt}
                  category={p.category?.title}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}


// ─── FAQ Accordion Block ─────────────────────────────────────────────────────
function FaqBlock({ block }: { block: any }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  return (
    <section style={{ padding: '100px 0', background: '#fdfdfd' }}>
      <div className={styles.container} style={{ maxWidth: 1200 }}>
        {/* Title */}
        <h2 style={{ 
          fontSize: 'clamp(28px, 4vw, 48px)', 
          fontWeight: 900, 
          marginBottom: 60, 
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          {(() => {
            const titleText = block.title || 'Preguntas frecuentes'
            const words = titleText.trim().split(' ')
            return words.map((word: string, idx: number) => {
              const cleanWord = word.toLowerCase().replace(/[^\wáéíóúñ]/g, '')
              let color = '#1B1B1B'
              if (cleanWord.includes('frecuente')) {
                color = '#F4852B'
              } else if (cleanWord.includes('pregunta')) {
                color = '#1B1B1B'
              }
              return (
                <span key={idx} style={{ color, marginRight: '8px' }}>
                  {word}
                </span>
              )
            })
          })()}
        </h2>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {block.questions?.map((q: any, i: number) => {
            const isOpen = activeIndex === i
            return (
              <div 
                key={i} 
                style={{ 
                  background: '#fff', 
                  borderRadius: '16px', 
                  border: '1px solid #eef2f8', 
                  boxShadow: isOpen ? '0 10px 30px rgba(244,133,43,0.06)' : '0 4px 15px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 32px',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: isOpen ? '#F4852B' : '#1B1B1B',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1.4 }}>
                    {q.question}
                  </span>
                  
                  {/* Chevron Icon with rotate */}
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(244,133,43,0.1)' : '#f3f4f6',
                    color: isOpen ? '#F4852B' : '#666',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                {/* Accordion Content with smooth height transition */}
                <div style={{
                  maxHeight: isOpen ? '500px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden',
                }}>
                  <div style={{ padding: '0 32px 28px 32px', color: '#555', fontSize: '16px', lineHeight: 1.7 }}>
                    {typeof q.answer === 'object' ? (
                      <RichText content={q.answer} />
                    ) : (
                      <p style={{ margin: 0 }}>{q.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Main Blocks renderer ─────────────────────────────────────────────────────
export default function Blocks({ layout, products = [], serverProducts = [] }: BlocksProps) {
  console.log('[Blocks] layout data:', layout)
  
  if (!layout || layout.length === 0) {
    console.warn('[Blocks] Layout is empty or undefined')
    return null
  }

  return (
    <div>
      {layout.map((block, index) => {
        const { blockType } = block

        switch (blockType) {
          // ── Hero / Hero Slider ──────────────────────────────────────────
          case 'hero':
          case 'hero-slider': {
            // Handle both singular and plural images
            const heroImg = block.backgroundImage?.url 
              ? resolveUrl(block.backgroundImage.url) 
              : block.backgroundImages?.[0]?.image?.url 
                ? resolveUrl(block.backgroundImages[0].image.url)
                : null

            // hero body text: block.text (new field)
            const heroBodyText = block.text || null
            // hero pill tag: block.subtitle
            const heroPillTag = block.subtitle || null

            return (
              <section
                key={index}
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '420px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  paddingTop: '140px',
                  paddingBottom: '70px',
                  background: '#001233',
                }}
              >
                {/* Background image — OPTIONAL, subtle when provided */}
                {heroImg && (
                  <img
                    src={heroImg}
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.32,
                    }}
                  />
                )}

                {/* Gradient overlay — LPAP brand: deep navy → pink/rose */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0, 18, 51, 0.9) 0%, rgba(220, 93, 163, 0.45) 100%)',
                  }}
                />

                <div
                  className="container"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>

                    {/* ── Small pill tag above title ── */}
                    {heroPillTag && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: 11,
                        fontWeight: 900,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '2.5px',
                        color: '#fff',
                        background: 'rgba(220, 93, 163, 0.35)',
                        padding: '6px 18px',
                        borderRadius: 9999,
                        marginBottom: 20,
                        border: '1px solid rgba(220, 93, 163, 0.55)',
                      }}>
                        {heroPillTag}
                      </span>
                    )}

                    {/* ── Main title — accent color on last word ── */}
                    <h1
                      style={{
                        fontSize: 'clamp(32px, 5vw, 54px)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        color: '#fff',
                        marginBottom: heroBodyText ? 16 : 0,
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      }}
                    >
                      {(() => {
                        // Split last word and color it with the accent
                        const words = (block.title || '').trim().split(' ')
                        if (words.length <= 1) return block.title
                        const rest = words.slice(0, -1).join(' ')
                        const last = words[words.length - 1]
                        return (
                          <>
                            {rest}{' '}
                            <span style={{ color: '#DC5DA3' }}>{last}</span>
                          </>
                        )
                      })()}
                    </h1>

                    {/* ── Body text / description ── */}
                    {heroBodyText && (
                      <p
                        style={{
                          fontSize: 'clamp(14px, 1.8vw, 17px)',
                          maxWidth: '620px',
                          margin: '0 auto',
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.88)',
                          textShadow: '0 1px 8px rgba(0,0,0,0.2)',
                        }}
                      >
                        {heroBodyText}
                      </p>
                    )}

                    {/* ── CTA Buttons ── */}
                    {block.buttons && block.buttons.length > 0 && (
                      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
                        {block.buttons.map((btn: any, i: number) => (
                          <Link
                            key={i}
                            href={btn.link}
                            style={i === 0
                              ? { background: '#f4852b', color: '#fff', padding: '13px 30px', borderRadius: 12, fontWeight: 800, fontSize: 14, transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(244,133,43,0.4)' }
                              : { border: '2px solid rgba(255,255,255,0.65)', color: '#fff', padding: '11px 28px', borderRadius: 12, fontWeight: 800, fontSize: 14, transition: 'all 0.2s' }
                            }
                          >
                            {btn.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          // ── CTA / Call to action ──────────────────────────────────────────
          case 'cta':
            return (
              <section key={index} style={{ padding: '100px 0', background: '#f4852b', textAlign: 'center', color: '#fff' }}>
                <div className={styles.container}>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, marginBottom: 20 }}>{block.title}</h2>
                  <p style={{ fontSize: 18, marginBottom: 40, opacity: 0.9 }}>{block.description}</p>
                  {block.link?.url && (
                    <Link href={block.link.url} style={{ background: '#fff', color: '#f4852b', padding: '18px 48px', borderRadius: 14, fontWeight: 900, fontSize: 16 }}>
                      {block.link.label}
                    </Link>
                  )}
                </div>
              </section>
            )

          // ── Rich Text ─────────────────────────────────────────────────────
          case 'richText':
            return (
              <section key={index} style={{ padding: '80px 0' }}>
                <div className={styles.container} style={{ maxWidth: 900, margin: '0 auto' }}>
                  <RichText content={block.content} />
                </div>
              </section>
            )

          // ── Image Section ──────────────────────────────────────────────────
          case 'imageSection': {
            const imgUrl = block.image?.url ? resolveUrl(block.image.url) : null
            return (
              <section key={index} style={{ padding: block.layout === 'fullWidth' ? 0 : '80px 0' }}>
                <div className={block.layout === 'fullWidth' ? '' : styles.container}>
                  {imgUrl && (
                    <div style={{ borderRadius: block.layout === 'fullWidth' ? 0 : 24, overflow: 'hidden' }}>
                      <img src={imgUrl} alt={block.caption || ''} style={{ width: '100%', display: 'block' }} />
                    </div>
                  )}
                  {block.caption && <p style={{ textAlign: 'center', marginTop: 16, color: '#888', fontStyle: 'italic' }}>{block.caption}</p>}
                </div>
              </section>
            )
          }

          // ── Features ──────────────────────────────────────────────────────
          case 'features':
            return (
              <section key={index} style={{ padding: '100px 0', background: '#f8fbff' }}>
                <div className={styles.container}>
                  {block.title && <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, marginBottom: 60 }}>{block.title}</h2>}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                    {block.items?.map((item: any, i: number) => (
                      <div key={i} style={{ padding: 40, background: '#fff', borderRadius: 20, border: '1px solid #eef2f8', textAlign: 'center' }}>
                        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{item.title}</h3>
                        <p style={{ color: '#666', lineHeight: 1.7 }}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          // ── Testimonials ──────────────────────────────────────────────────
          case 'testimonials':
            return (
              <section key={index} style={{ padding: '100px 0' }}>
                <div className={styles.container}>
                  {block.title && <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, marginBottom: 60 }}>{block.title}</h2>}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                    {block.testimonials?.map((t: any, i: number) => (
                      <div key={i} style={{ padding: 36, background: '#fff', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <p style={{ fontSize: 17, color: '#333', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>"{t.quote}"</p>
                        <strong style={{ color: '#111' }}>{t.name}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          // ── Gallery ───────────────────────────────────────────────────────
          case 'gallery':
            return (
              <section key={index} style={{ padding: '80px 0' }}>
                <div className={styles.container}>
                  {block.title && <h2 style={{ textAlign: 'center', fontSize: 40, fontWeight: 900, marginBottom: 48 }}>{block.title}</h2>}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                    {block.images?.map((item: any, i: number) => {
                      const url = item.image?.url ? resolveUrl(item.image.url) : null
                      return url ? (
                        <div key={i} style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1', background: '#f0f0f0' }}>
                          <img src={url} alt={item.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              </section>
            )

          // ── FAQ ───────────────────────────────────────────────────────────
          case 'faq':
            return <FaqBlock key={index} block={block} />

          // ── Spacer ────────────────────────────────────────────────────────
          case 'spacer': {
            const h = block.size === 'small' ? 40 : block.size === 'large' ? 120 : 80
            return <div key={index} style={{ height: h }} />
          }

          // ── Support Form ──────────────────────────────────────────────────
          case 'supportForm':
            return (
              <SupportForm
                key={index}
                title={block.title}
                description={block.description}
              />
            )

          // ── Archive (Product Carousel) ────────────────────────────────────
          case 'archive':
            return <ArchiveBlock key={index} block={block} products={products} />

          // ── Product Grid ──────────────────────────────────────────────────
          case 'product-grid':
            return <ProductGridBlock key={index} block={block} serverProducts={serverProducts} />

          // ── Fallback ──────────────────────────────────────────────────────
          default:
            return (
              <div key={index} style={{ padding: '12px 20px', margin: '4px 0', background: '#fffbe6', border: '1px dashed #f0c000', borderRadius: 8, fontSize: 13, color: '#888', textAlign: 'center' }}>
                Bloque <strong>«{blockType}»</strong> recibido del CMS — sin componente asignado
              </div>
            )
        }
      })}
    </div>
  )
}
