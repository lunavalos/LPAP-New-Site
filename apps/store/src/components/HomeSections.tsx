'use client'

import React from 'react'
import Link from 'next/link'
import {
  Award, Heart, Star, Pill, ShoppingBag, Milk, Gift,
  Ticket, HandHeart, Bus, Gamepad2, ArrowRight,
  Building2, Users, CheckCircle2
} from 'lucide-react'
import styles from './HomeSections.module.css'

// ──────────────────────────────────────────
// Stats Section
// ──────────────────────────────────────────
export function StatsSection() {
  const stats = [
    { number: '500+', label: 'Niños y Niñas', sub: 'Beneficiarios directos' },
    { number: '1,200+', label: 'Familias', sub: 'Beneficiarios indirectos' },
    { number: '10,000+', label: 'Atenciones', sub: 'Del 2015 a la fecha' },
  ]
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statNumber}>{s.number}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────
// Why LPAP Section
// ──────────────────────────────────────────
export function WhySection() {
  const features = [
    {
      Icon: Award,
      color: 'orange',
      title: 'Certificación CEMEFI',
      text: 'Certificados con Institucionalidad y Transparencia 2023 por el Centro Mexicano para la Filantropía.',
    },
    {
      Icon: Heart,
      color: 'pink',
      title: 'Creada con amor',
      text: 'Fundada por los padres de Luis Pablo en 2015, un ángel que luchó contra la leucemia mieloide aguda.',
    },
    {
      Icon: Star,
      color: 'blue',
      title: 'Apoyo integral',
      text: 'Cubrimos necesidades médicas, emocionales, alimenticias y recreativas de cada niño y su familia.',
    },
  ]

  return (
    <section className={styles.whySection}>
      <div className="container">
        <div className={styles.whyGrid}>
          <div className={styles.whyContent}>
            <span className={styles.sectionTag}>¿Por qué apoyar?</span>
            <h2 className={styles.sectionTitle}>
              Cada niño merece<br />
              <span className={styles.sectionTitleAccent}>lo mejor</span>
            </h2>
            <p className={styles.whyText}>
              LPAP A.C. es una asociación civil sin fines de lucro que brinda apoyo integral para impactar positivamente la vida de niños con cáncer y sus familias. Estamos comprometidos a trabajar con el corazón.
            </p>
            <blockquote className={styles.whyQuote}>
              "El límite es el cielo, y en el cielo también hay ángeles luchando con nosotros. Luchemos juntos."
            </blockquote>
            <div className={styles.btnGroup}>
              <Link href="/nosotros" className={styles.ctaBtn}>
                Conócenos <ArrowRight size={16} />
              </Link>
              <Link href="/transparencia" className={styles.ctaBtnOutline}>Transparencia</Link>
            </div>
          </div>
          <div className={styles.whyFeatures}>
            {features.map(({ Icon, color, title, text }, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={`${styles.featureIcon} ${styles[color as keyof typeof styles]}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className={styles.featureTitle}>{title}</div>
                  <div className={styles.featureText}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────
// Programs Section
// ──────────────────────────────────────────
export function ProgramsSection() {
  const programs = [
    { Icon: Pill, title: 'Apoyo a la Vida', text: 'Asistencia para medicamentos, quimioterapias, estudios médicos y gastos hospitalarios.' },
    { Icon: ShoppingBag, title: 'Despensas y Sonrisas', text: 'Entrega de despensas y alimentos a las familias de nuestros guerreros.' },
    { Icon: Milk, title: 'Pediasure', text: 'Suplementos alimenticios especializados para niños en tratamiento.' },
    { Icon: Gift, title: 'Día del Niñ@ y Navidad', text: 'Actividades especiales y regalos para celebrar a nuestros pequeños héroes.' },
    { Icon: Ticket, title: 'Rifas y Sueños', text: 'Eventos de recaudación de fondos para seguir impactando más vidas.' },
    { Icon: HandHeart, title: 'Reconforta', text: 'Acompañamiento y apoyo emocional para pacientes y familias en etapa terminal.' },
    { Icon: Bus, title: 'Subsidio de Transporte', text: 'Apoyo para el traslado a hospitales durante el tratamiento.' },
    { Icon: Gamepad2, title: 'Ludotecas LPAP', text: 'Espacios de juego y recreación en los hospitales para los niños.' },
  ]

  return (
    <section className={styles.programsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Programas</span>
          <h2 className={styles.sectionTitle}>
            Cómo apoyamos a<br /><span className={styles.sectionTitleAccent}>cada familia</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Implementamos programas integrales para cubrir cada necesidad de los niños y sus familias durante el tratamiento.
          </p>
        </div>
        <div className={styles.programsGrid}>
          {programs.map(({ Icon, title, text }, i) => (
            <div key={i} className={styles.programCard}>
              <div className={styles.programIconWrap}>
                <Icon size={26} className={styles.programIcon} />
              </div>
              <div className={styles.programTitle}>{title}</div>
              <p className={styles.programText}>{text}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/programas" className={styles.ctaBtn}>
            Ver todos los programas <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────
// Store Section
// ──────────────────────────────────────────
interface StoreSectionProps { products: any[] }

export function StoreSection({ products }: StoreSectionProps) {
  const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
  const display = products.slice(0, 6)

  return (
    <section className={styles.storeSection}>
      <div className="container">
        <div className={styles.storeGrid}>
          <div className={styles.storeContent}>
            <span className={styles.sectionTag}>Tienda con Causa</span>
            <h2 className={styles.sectionTitle}>
              Compra y<br /><span className={styles.sectionTitleAccent}>haz el bien</span>
            </h2>
            <p className={styles.whyText}>
              El <strong>100% de las ganancias</strong> de nuestra tienda se destina directamente a los programas de apoyo a niños con cáncer y sus familias.
            </p>
            <p className={styles.whyText}>
              Bolsas ecológicas · Libros · Pines · Cubrebocas · Termos · y mucho más
            </p>
            <div className={styles.btnGroup} style={{ marginTop: 32 }}>
              <Link href="/tienda" className={styles.ctaBtn}>
                Ir a la tienda <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className={styles.storeProducts}>
            {display.length > 0
              ? display.map((p: any, i: number) => {
                const url = p.images?.[0]?.image?.url
                return (
                  <Link key={i} href={`/tienda/${p.slug || ''}`} className={styles.storeProductImg}>
                    {url
                      ? <img src={`${PAYLOAD_URL}${url}`} alt={p.title || 'Producto'} />
                      : <div className={styles.storeProductPlaceholder}><ShoppingBag size={32} color="#ccc" /></div>
                    }
                  </Link>
                )
              })
              : Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.storeProductImg}>
                  <div className={styles.storeProductPlaceholder}><ShoppingBag size={32} color="#ccc" /></div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────
// Donate Section
// ──────────────────────────────────────────
export function DonateSection() {
  const methods = [
    { Icon: Users, title: 'Apadrina a un Niño', text: 'Conviértete en el ángel de uno de nuestros pequeños con aportaciones mensuales recurrentes.', btn: 'Ser Padrino', href: '/donar' },
    { Icon: CheckCircle2, title: 'Mercado Pago', text: 'Realiza tu donación a través de Mercado Pago con un solo clic, rápido y seguro.', btn: 'Donar', href: 'https://link.mercadopago.com.mx/luchandoporangeles' },
    { Icon: CheckCircle2, title: 'PayPal', text: 'Transfiere directamente desde tu cuenta de PayPal de forma segura e inmediata.', btn: 'Donar', href: '/donar' },
    { Icon: Building2, title: 'Transferencia', text: 'Envía tu comprobante a contacto@lpap.com.mx o llámanos al (844) 228-1480.', btn: 'Más Info', href: '/donar' },
  ]

  return (
    <section className={styles.donateSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Formas de Donar</span>
          <h2 className={styles.sectionTitle}>
            Con tu donativo puedes<br /><span style={{ color: 'var(--primary)' }}>cambiar una vida</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Elige la forma que más te acomode. Cada peso llega directamente a quien más lo necesita.
          </p>
        </div>
        <div className={styles.donateGrid}>
          {methods.map(({ Icon, title, text, btn, href }, i) => (
            <div key={i} className={styles.donateCard}>
              <div className={styles.donateCardIconWrap}>
                <Icon size={28} />
              </div>
              <div className={styles.donateCardTitle}>{title}</div>
              <p className={styles.donateCardText}>{text}</p>
              <Link href={href} className={styles.donateCardBtn}>{btn}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────
// Quote Banner
// ──────────────────────────────────────────
export function QuoteBanner() {
  return (
    <section className={styles.quoteBanner}>
      <div className="container">
        <p className={styles.quoteText}>
          "Durante nuestra lucha el amor y la pasión a esta causa han movido miles de corazones. Muchos niños de México nos necesitan."
        </p>
        <Link href="/donar" className={styles.quoteBannerBtn}>
          Únete a nuestra causa <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────
// ESR Section
// ──────────────────────────────────────────
export function ESRSection() {
  const steps = [
    { title: 'Ventaja competitiva real', text: 'Ser una empresa socialmente responsable mejora la productividad, reduce el ausentismo y fortalece equipos de trabajo.' },
    { title: 'Únete a nuestra red', text: 'Hay muchas maneras de ayudar. Nosotros te apoyamos a encontrar la mejor opción para tu compañía sin ningún costo.' },
    { title: 'Impacto real y medible', text: 'Cada empresa que se suma transforma directamente la vida de niños con cáncer y sus familias en México.' },
  ]

  return (
    <section className={styles.esrSection}>
      <div className="container">
        <div className={styles.esrGrid}>
          <div>
            <span className={styles.sectionTag}>Empresas</span>
            <h2 className={styles.sectionTitle}>
              Programas para<br /><span className={styles.sectionTitleAccent}>empresas ESR</span>
            </h2>
            <p className={styles.whyText}>
              Únete a nuestra red de empresas socialmente responsables. Si tienes un colaborador que esté pasando por una situación de cáncer infantil, cuenta con nosotros.
            </p>
            <div className={styles.btnGroup} style={{ marginTop: 32 }}>
              <Link href="/nosotros" className={styles.ctaBtn}>
                Contactar <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className={styles.esrSteps}>
            {steps.map((s, i) => (
              <div key={i} className={styles.esrStep}>
                <div className={styles.esrStepNum}>{i + 1}</div>
                <div>
                  <div className={styles.esrStepTitle}>{s.title}</div>
                  <p className={styles.esrStepText}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
// ──────────────────────────────────────────
// Archive Section (Product Grid Premium)
// ──────────────────────────────────────────
interface ArchiveSectionProps {
  data: any
  allProducts: any[]
}

export function ArchiveSection({ data, allProducts }: ArchiveSectionProps) {
  const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
  const scrollRef = React.useRef<HTMLDivElement>(null)
  
  // Si es manual, filtrar. Si es colección, usar todos.
  let products = allProducts
  if (data.populateBy === 'manual' && data.manualSelection) {
    products = data.manualSelection
  }
  
  // Si no hay productos, usamos unos de prueba para que se vea el diseño
  const display = products.length > 0 ? products : [
    { title: 'Bolsa Ecológica LPAP', price: 150, slug: 'bolsa', images: [] },
    { title: 'Termo Guerrero', price: 350, slug: 'termo', images: [] },
    { title: 'Pin Ángel Luis', price: 50, slug: 'pin', images: [] },
    { title: 'Libro de Esperanza', price: 200, slug: 'libro', images: [] },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.archiveSection}>
      <div className="container">
        <div className={styles.archiveHeaderRow}>
          <div>
            <span className={styles.sectionTag}>Nuestra Tienda</span>
            <h2 className={styles.sectionTitle}>{data.title || 'Productos con Causa'}</h2>
          </div>
          <div className={styles.carouselControls}>
            <button onClick={() => scroll('left')} className={styles.controlBtn} aria-label="Anterior">
              <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={() => scroll('right')} className={styles.controlBtn} aria-label="Siguiente">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        <div className={styles.carouselContainer} ref={scrollRef}>
          <div className={styles.productCarouselGrid}>
            {display.map((p: any, i: number) => {
              const url = p.images?.[0]?.image?.url
              const price = p.price || 0
              const formattedPrice = new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 0,
              }).format(price)

              return (
                <div key={i} className={styles.productCard}>
                  <div className={styles.productImageWrap}>
                    {url ? (
                      <img src={`${PAYLOAD_URL}${url}`} alt={p.title} className={styles.productImage} />
                    ) : (
                      <div className={styles.productPlaceholder}>
                        <ShoppingBag size={48} color="#ddd" />
                      </div>
                    )}
                    <div className={styles.productBadge}>
                      <Star size={12} fill="orange" color="orange" /> Prime Pick
                    </div>
                  </div>
                  
                  <div className={styles.productContent}>
                    <div className={styles.productPrice}>
                      {formattedPrice} <span className={styles.productPriceLabel}>List price</span>
                    </div>
                    <h3 className={styles.productTitle}>{p.title}</h3>
                    
                    <div className={styles.productMeta}>
                      <div className={styles.metaItem}>
                        <Heart size={16} color="var(--accent)" /> 29m² Living
                      </div>
                      <div className={styles.metaItem}>
                        <Award size={16} color="var(--primary)" /> 2 Rooms
                      </div>
                    </div>

                    <div className={styles.productAuthor}>
                      By • <span className={styles.productAuthorName}>Waleed Sabir</span>
                    </div>

                    <Link href={`/tienda/${p.slug}`} className={styles.productButton}>
                      View Details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
