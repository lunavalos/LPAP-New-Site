import React from 'react'
import Link from 'next/link'
import { Target, Eye, Sparkles, Heart, ArrowRight } from 'lucide-react'
import Blocks from '@/components/Blocks'
import styles from './Nosotros.module.css'

const PAYLOAD_URL = process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

/* ── Static fallback Hero (shown if CMS has no hero block) ── */
function StaticHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Quiénes Somos</span>
          <h1 className={styles.heroTitle}>
            Nuestra historia y <span className={styles.heroAccent}>compromiso</span>
          </h1>
          <p className={styles.heroSub}>
            Conoce a Luchando Por Ángeles Pequeños, A.C., una organización altruista nacida
            del amor, dedicada a brindar apoyo integral a los guerreros contra el cáncer.
          </p>
        </div>
      </div>
    </section>
  )
}

export default async function NosotrosPage() {
  // Fetch the "nosotros" page from CMS to get the hero block dynamically if configured
  let heroLayout: any[] = []
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/pages?where[slug][equals]=nosotros&depth=2`,
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
    console.error('NosotrosPage: Error fetching CMS layout', e)
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* ── Hero: dynamic from CMS if available, else static fallback ── */}
      {heroLayout.length > 0 ? (
        <Blocks layout={heroLayout} />
      ) : (
        <StaticHero />
      )}

      {/* ── Commitment / About Story Section ── */}
      <section className={styles.commitmentSection}>
        <div className="container">
          <div className={styles.grid2Col}>
            <div className={styles.aboutContent}>
              <span className={styles.tag}>Nuestro Compromiso</span>
              <h2 className={styles.sectionTitle}>
                Trabajamos con el corazón por nuestros <span className={styles.sectionTitleAccent}>Ángeles Pequeños</span>
              </h2>
              <div className={styles.aboutText}>
                <p>
                  <strong>Luchando Por Ángeles Pequeños, A.C.</strong>, es una organización benéfica dedicada,
                  altruista y comprometida, que se esfuerza por brindar un apoyo integral destinado a generar
                  un impacto positivo y a mejorar la calidad de vida de niños y niñas que enfrentan el
                  desafío del cáncer, así como para sus familias.
                </p>
                <p>
                  Esta asociación civil sin fines de lucro fue concebida con profundo amor por los padres
                  de un pequeño ángel que vivió en carne propia la lucha contra esta enfermedad. En su memoria,
                  estamos firmemente comprometidos a trabajar incansablemente para proporcionar apoyo
                  integral a otros pequeños ángeles que hoy enfrentan luchas similares en todo México.
                </p>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <div className={styles.logoCard}>
                <img
                  src="../img/empapando-suenos.webp"
                  alt="LPAP Nosotros"
                  className={styles.logoImage}
                />
                <div className={styles.decorBlob} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars Section (Misión, Visión, Valores) ── */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.grid3Col}>
            {/* Misión Card */}
            <div className={styles.pillarCard}>
              <div className={styles.iconWrap} style={{ background: 'rgba(244,133,43,0.08)', color: 'var(--primary)' }}>
                <Target size={28} />
              </div>
              <h3 className={styles.cardTitle}>MISIÓN</h3>
              <div className={styles.cardText}>
                <p>
                  Nuestra misión es allanar y suavizar el complejo camino que deben atravesar los niños
                  de escasos recursos que luchan contra el cáncer, junto con sus familias.
                </p>
                <p>
                  Lo logramos proporcionando apoyo integral y constante acompañamiento a lo largo de todo
                  su tratamiento, con el fin de aliviar su carga y fortalecer su resistencia durante este
                  desafío vital.
                </p>
              </div>
            </div>

            {/* Visión Card */}
            <div className={styles.pillarCard}>
              <div className={styles.iconWrap} style={{ background: 'rgba(73,159,208,0.08)', color: 'var(--secondary)' }}>
                <Eye size={28} />
              </div>
              <h3 className={styles.cardTitle}>VISIÓN</h3>
              <div className={styles.cardText}>
                <p>
                  Consolidar nuestro modelo de intervención como un referente nacional en cuanto a la atención
                  integral de niños y niñas que enfrentan el cáncer, así como a sus familias.
                </p>
                <p>
                  Estamos trabajando incansablemente para diseñar e implementar programas que produzcan un
                  impacto positivo significativo, aportando siempre una luz de esperanza y soporte en medio
                  de sus mayores desafíos.
                </p>
              </div>
            </div>

            {/* Valores Card */}
            <div className={styles.pillarCard}>
              <div className={styles.iconWrap} style={{ background: 'rgba(220,93,163,0.08)', color: 'var(--accent)' }}>
                <Sparkles size={28} />
              </div>
              <h3 className={styles.cardTitle}>VALORES</h3>
              <div className={styles.cardText}>
                <div className={styles.valuesList}>
                  <div className={styles.valueItem}>
                    <span className={styles.valueDot} style={{ backgroundColor: 'var(--accent)' }} />
                    <div className={styles.valueContent}>
                      <strong>Amor y Empatía</strong>
                      <span>Guiamos cada acción con amor profundo, heredado de la memoria de nuestro ángel.</span>
                    </div>
                  </div>
                  <div className={styles.valueItem}>
                    <span className={styles.valueDot} style={{ backgroundColor: 'var(--accent)' }} />
                    <div className={styles.valueContent}>
                      <strong>Compromiso Total</strong>
                      <span>Damos todo el corazón para aliviar la carga económica y médica de las familias.</span>
                    </div>
                  </div>
                  <div className={styles.valueItem}>
                    <span className={styles.valueDot} style={{ backgroundColor: 'var(--accent)' }} />
                    <div className={styles.valueContent}>
                      <strong>Transparencia</strong>
                      <span>Aseguramos que el 100% de los donativos lleguen con la máxima integridad a los guerreros.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Ser Parte del Cambio Section ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>¿Quieres ser parte del cambio?</h2>
          <p className={styles.ctaSub}>
            Tu donativo, por más pequeño que parezca, marca una diferencia directa en la vida de un guerrero.
            Ayúdanos a suavizar su camino y regalar esperanza. LPAP es donataria autorizada SAT.
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
