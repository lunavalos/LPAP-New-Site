'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, CreditCard, Sparkles, ArrowRight, Phone } from 'lucide-react'
import styles from './CTA.module.css'

const METHODS = [
  {
    Icon: Heart,
    title: 'Apadrina un Guerrero',
    sub: 'Donación mensual recurrente, desde $200 MXN',
    bg: 'rgba(244,133,43,0.08)',
    color: 'var(--primary)',
    href: '/donar',
  },
  {
    Icon: Sparkles,
    title: 'Mercado Pago',
    sub: 'Donación única o recurrente, en segundos',
    bg: 'rgba(244,133,43,0.08)',
    color: 'var(--primary)',
    href: 'https://link.mercadopago.com.mx/luchandoporangeles',
  },
  {
    Icon: CreditCard,
    title: 'Transferencia Bancaria',
    sub: 'Recibo deducible de impuestos (SAT)',
    bg: 'rgba(244,133,43,0.08)',
    color: 'var(--primary)',
    href: '/donar',
  },
  {
    Icon: Phone,
    title: 'Contacto Directo',
    sub: 'Tel. (844) 228-1480 · contacto@lpap.com.mx',
    bg: 'rgba(244,133,43,0.08)',
    color: 'var(--primary)',
    href: null,
  },
]

const ESR_POINTS = [
  {
    title: 'Impacto Real y Medible',
    text: 'Tu alianza financia tratamientos activos: medicamentos, quimioterapias y apoyo emocional.',
  },
  {
    title: 'Donataria Autorizada · SAT',
    text: 'Emitimos recibos deducibles de impuestos. Responsabilidad fiscal y transparencia certificada.',
  },
  {
    title: 'Red ESR y Visibilidad Social',
    text: 'Intégrate a nuestra red de empresas solidarias y comunica tu compromiso con el bienestar infantil.',
  },
]

export default function CTA() {
  return (
    <>
      {/* ── 2. Donation Methods block — now the last block before footer ── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.topGrid}>

            {/* Left: Heading + CTAs */}
            <div className={styles.topLeft}>
              <span className={styles.tag}>¿Cómo Apoyar?</span>
              <h2 className={styles.topTitle}>
                Tu generosidad<br />
                <span className={styles.topAccent}>cambia una vida real</span>
              </h2>
              <p className={styles.topText}>
                100% de tu donativo se destina directamente a apoyar a los guerreros y sus familias.
                LPAP es donataria autorizada con certificación CEMEFI de transparencia óptima.
              </p>
              <div className={styles.topActions}>
                <Link href="/donar" className={styles.btnPink}>
                  <Heart size={16} /> Donar Ahora
                </Link>
                <Link href="https://link.mercadopago.com.mx/luchandoporangeles" target="_blank" className={styles.btnOrange}>
                  Mercado Pago <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Method cards stack */}
            <div className={styles.methodsStack}>
              {METHODS.map(({ Icon, title, sub, bg, color, href }, i) => {
                const inner = (
                  <>
                    <div className={styles.methodIconWrap} style={{ background: bg, color }}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.methodInfo}>
                      <div className={styles.methodTitle}>{title}</div>
                      <div className={styles.methodSub}>{sub}</div>
                    </div>
                    {href && <ArrowRight size={16} className={styles.methodArrow} />}
                  </>
                )

                return href ? (
                  <Link
                    key={i}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    className={`${styles.methodCard} ${styles.linked}`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={i} className={styles.methodCard}>
                    {inner}
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
