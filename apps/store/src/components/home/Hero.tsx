'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'

// Images from /public/img — 5 real LPAP photos
const SLIDES = [
  '/img/ludotecas-2.jpg',
  '/img/ludotecas-7.jpg',
  '/img/ludotecas-5.jpg',
  '/img/ludotecas-1.jpg',
  '/img/ludotecas-3.jpg'
]

const SLIDE_DURATION = 5000 // ms per slide

export default function Hero() {
  const [current, setCurrent] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.heroSection}>

      {/* ── Slideshow background ── */}
      <div className={styles.slidesContainer}>
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* ── Dark gradient overlay ── */}
      <div className={styles.overlay} />

      {/* ── Centered Content ── */}
      <div className={styles.content}>
        <span className={styles.tagline}>Lucha Por Ángeles Pequeños A.C.</span>

        <h1 className={styles.title}>
          LPAP transforma apoyo{' '}
          <span className={styles.accentWord}>en esperanza</span>
        </h1>

        <p className={styles.subtitle}>
          Brindamos apoyo integral y esperanza a niños con cáncer y sus familias en México.
          Cada pequeña acción se convierte en un milagro de vida.
        </p>

        <div className={styles.actions}>
          <Link href="/donar" className={styles.btnPrimary}>
            Donar Ahora
          </Link>
          <Link href="/nosotros" className={styles.btnOutline}>
            Nuestra Causa
          </Link>
        </div>
      </div>

      {/* ── Slide indicator dots ── */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>

    </section>
  )
}
