import React from 'react'
import Link from 'next/link'
import {
  Heart,
  ArrowRight,
} from 'lucide-react'
import Blocks from '@/components/Blocks'
import ProgramsGrid from '@/components/ProgramsGrid'
import styles from './Programas.module.css'

const PAYLOAD_URL = process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

const IMPACT = [
  { num: '+800', label: 'Beneficiarios directos' },
  { num: '+3,200', label: 'Beneficiarios indirectos' },
  { num: '14', label: 'Estados Atendidos' },
  { num: '+2660', label: 'Totales' },
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

          <ProgramsGrid />
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
