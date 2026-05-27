import React from 'react'
import Link from 'next/link'
import {
  Pill,
  ShoppingBasket,
  Milk,
  Gift,
  Ticket,
  HandHeart,
  Bus,
  Gamepad2,
  Waves,
  Users,
  Heart,
  ArrowRight,
} from 'lucide-react'
import Blocks from '@/components/Blocks'
import styles from './Programas.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

/* ── Static Programs data ─── */
const PROGRAMS = [
  {
    id: 'apoyo-a-la-vida',
    Icon: Pill,
    title: 'Apoyo a la Vida',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'Cubrimos medicamentos oncológicos, quimioterapias, estudios médicos de alta especialidad y exámenes previos a trasplante de médula ósea.',
    details: [
      'Quimioterapias y medicamentos oncológicos',
      'Estudios médicos especializados',
      'Exámenes previos a trasplante de médula',
      'Gastos hospitalarios urgentes',
    ],
    note: 'Los tratamientos fluctúan entre $10,000 y $60,000 MXN según cada caso, evaluados con estudio socioeconómico garantizando el apoyo a quienes más lo necesitan.',
  },
  {
    id: 'despensas-y-sonrisas',
    Icon: ShoppingBasket,
    title: 'Despensas y Sonrisas',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.08)',
    text: 'Cada mes entregamos despensas nutritivas y surtidas con productos de necesidad básica, artículos de higiene y elementos de seguridad para las familias de nuestros guerreros.',
    details: [
      'Despensas mensuales con alimentos básicos',
      'Artículos de higiene personal',
      'Productos de seguridad e higiene',
    ],
  },
  {
    id: 'pediasure',
    Icon: Milk,
    title: 'Nutrición · Pediasure',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.08)',
    text: 'La quimioterapia elimina el apetito de los niños. Suministramos Pediasure para asegurar la nutrición necesaria y que puedan continuar con su tratamiento.',
    details: [
      'Suplemento nutricional especializado',
      'Apoya durante la pérdida de apetito',
      'Permite continuar con el tratamiento',
    ],
  },
  {
    id: 'dia-del-nino-y-navidad',
    Icon: Gift,
    title: 'Día del Niño y Navidad',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'En estos días especiales organizamos actividades recreativas y entregamos regalos para sacar a los guerreros de la rutina de hospitales y medicamentos.',
    details: [
      'Actividades y celebraciones especiales',
      'Regalos personalizados',
      'Momentos de diversión y alegría',
    ],
  },
  {
    id: 'rifas-y-suenos',
    Icon: Ticket,
    title: 'Rifas y Sueños',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.08)',
    text: 'Una vez al mes rifamos regalos especiales entre niños con cáncer de todo el país y el mundo. Hemos llegado a Monterrey, CDMX, Chihuahua, León y hasta Estados Unidos.',
    details: [
      'Rifas mensuales a nivel nacional e internacional',
      'Abierto a todos los guerreros contra el cáncer',
      'Entrega de regalos especiales',
    ],
  },
  {
    id: 'reconforta',
    Icon: HandHeart,
    title: 'Reconforta en Amor',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.08)',
    text: 'Brindamos apoyo emocional, tanatológico y acompañamiento integral a familias con pacientes en estado terminal, haciendo sus últimos días especiales.',
    details: [
      'Decoración temática del cuarto',
      'Regalos según deseos del paciente',
      'Acompañamiento tanatológico',
      'Comida favorita del guerrero',
    ],
  },
  {
    id: 'subsidio-de-transporte',
    Icon: Bus,
    title: 'Subsidio de Transporte',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'Cubrimos el viaje redondo (autobús o avión) de pacientes foráneos que deben desplazarse a otras ciudades para recibir quimioterapias o trasplante de médula.',
    details: [
      'Traslado en autobús o avión',
      'Para pacientes de otras ciudades',
      'Cubre el viaje redondo completo',
    ],
  },
  {
    id: 'ludotecas-lpap',
    Icon: Gamepad2,
    title: 'Ludotecas LPAP',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.08)',
    text: 'Equipamos espacios de juego dentro de hospitales donde los niños pueden jugar, leer, aprender y soñar. Ya operamos en Tepic, Nayarit y expandimos a más estados.',
    details: [
      'Espacios de juego dentro de hospitales',
      'Operamos en Tepic, Nayarit (IMSS)',
      'Próximamente: Cd. Obregón, S.L.P., León y Aguascalientes',
    ],
  },
  {
    id: 'empapando-suenos',
    Icon: Waves,
    title: 'Empapando Sueños',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.08)',
    text: 'Viaje a Cancún organizado con Fundación Palace, donde nuestros beneficiarios y sus familias disfrutan una experiencia de felicidad, descanso y unión familiar.',
    details: [
      'Viaje todo incluido a Cancún',
      'En conjunto con Fundación Palace',
      'Para beneficiarios y sus familias',
    ],
  },
  {
    id: 'voluntariado-en-hospital',
    Icon: Users,
    title: 'Voluntariado en Hospital',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'Nuestro equipo de voluntarios visita hospitales para realizar actividades recreativas con niños en ambulatoria o internados, brindando compañía y apoyo emocional.',
    details: [
      'Visitas regulares a hospitales',
      'Actividades recreativas y educativas',
      'Apoyo emocional a pacientes internados',
    ],
  },
]

const IMPACT = [
  { num: '10+', label: 'Programas Activos' },
  { num: '2,400+', label: 'Familias Apoyadas' },
  { num: '14', label: 'Estados Atendidos' },
  { num: '100%', label: 'Transparencia SAT' },
]

/* ── Static hero fallback (shown if CMS has no hero block) ── */
function StaticHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Nuestros Programas</span>
          <h1 className={styles.heroTitle}>
            Hacemos más sencillo el{' '}
            <span className={styles.heroAccent}>camino más difícil</span>
          </h1>
          <p className={styles.heroSub}>
            Diez programas de apoyo integral que cubren las necesidades médicas, nutricionales,
            emocionales y recreativas de los guerreros y sus familias en México.
          </p>
        </div>
      </div>
    </section>
  )
}

export default async function ProgramasPage() {
  // Fetch the "programas" page from CMS to get the hero block
  let heroLayout: any[] = []
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/pages?where[slug][equals]=programas&depth=2`,
      { cache: 'no-store' }
    )
    if (res.ok) {
      const json = await res.json()
      const pageData = json.docs?.[0]
      if (pageData?.layout?.length > 0) {
        // Only take hero blocks from the CMS layout
        heroLayout = pageData.layout.filter(
          (b: any) => b.blockType === 'hero' || b.blockType === 'hero-slider'
        )
      }
    }
  } catch (e) {
    console.error('ProgramasPage: Error fetching CMS layout', e)
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero: dynamic from CMS if available, else static fallback ── */}
      {heroLayout.length > 0 ? (
        <Blocks layout={heroLayout} />
      ) : (
        <StaticHero />
      )}

      {/* ── Impact stat strip ── */}
      <div className={styles.introStrip}>
        <div className="container">
          <div className={styles.introInner}>
            {IMPACT.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className={styles.introDivider} />}
                <div className={styles.introBadge}>
                  <div
                    className={styles.introBadgeIcon}
                    style={{
                      background: i % 3 === 0 ? 'rgba(244,133,43,0.1)' : i % 3 === 1 ? 'rgba(220,93,163,0.1)' : 'rgba(73,159,208,0.1)',
                      color: i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--accent)' : 'var(--secondary)',
                    }}
                  >
                    <Heart size={20} />
                  </div>
                  <div className={styles.introBadgeText}>
                    <strong style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)' }}>{item.num}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Programs Section ── */}
      <section className={styles.programsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>Programas de Apoyo</span>
            <h2 className={styles.sectionTitle}>
              Cómo LPAP transforma el{' '}
              <span className={styles.sectionTitleAccent}>camino juntos</span>
            </h2>
            <p className={styles.sectionSub}>
              Un sistema de soporte integral que acompaña a los guerreros desde el diagnóstico
              hasta la recuperación, o en cada etapa de su lucha.
            </p>
          </div>

          <div className={styles.grid}>
            {PROGRAMS.map(({ id, Icon, title, color, bg, text, details, note }) => (
              <div key={id} className={styles.card} id={id}>
                <div className={styles.cardAccent} style={{ backgroundColor: color }} />
                <div className={styles.iconWrap} style={{ background: bg, color }}>
                  <Icon size={24} />
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>

                {details && details.length > 0 && (
                  <div className={styles.cardDetails}>
                    <ul className={styles.detailList}>
                      {details.map((d, i) => (
                        <li key={i} className={styles.detailItem}>
                          <span className={styles.detailDot} style={{ background: color }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {note && (
                      <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 12, lineHeight: 1.55, fontStyle: 'italic' }}>
                        {note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>
            ¿Quieres ser parte del cambio?
          </h2>
          <p className={styles.ctaSub}>
            Tu donativo, ya sea grande o pequeño, financia directamente uno o más de estos programas.
            El 100% llega a los guerreros. LPAP es donataria autorizada SAT.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/donar" className={styles.ctaBtnWhite}>
              <Heart size={18} />
              Donar Ahora
            </Link>
            <Link
              href="https://link.mercadopago.com.mx/luchandoporangeles"
              target="_blank"
              className={styles.ctaBtnOutline}
            >
              Mercado Pago
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
