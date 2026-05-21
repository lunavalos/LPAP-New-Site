'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './HeroIndex.module.css'

interface HeroIndexProps {
  data: any
  images: string[]
}

export default function HeroIndex({ data, images: fallbackImages }: HeroIndexProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Extraer imágenes según el tipo de bloque
  const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
  
  let blockImages: string[] = []
  
  if (data?.blockType === 'hero-slider') {
    blockImages = data?.backgroundImages
      ?.map((item: any) => {
        const url = item.image?.url
        if (!url) return null
        return url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
      })
      .filter(Boolean) || []
  } else if (data?.blockType === 'hero') {
    const url = data?.backgroundImage?.url
    if (url) {
      blockImages = [url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`]
    }
  }

  const finalImages = blockImages.length > 0 ? blockImages : fallbackImages

  useEffect(() => {
    if (finalImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % finalImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [finalImages])

  return (
    <section className={styles.heroContainer}>
      {/* Background Slideshow */}
      <div className={styles.heroBackground}>
        {finalImages.map((img: string, i: number) => (
          <div
            key={i}
            className={`${styles.bgImage} ${i === currentImageIndex ? styles.bgActive : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className={styles.heroOverlay}></div>
      </div>

      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {data?.title || 'UNIDOS CONTRA EL CÁNCER INFANTIL'}
            </h1>
            <p className={styles.heroSubtitle}>
              {data?.subtitle || 'Apoyamos a niños con cáncer y sus familias a través de programas de salud, educación y asistencia integral.'}
            </p>
            <div className={styles.heroActions}>
              {data?.buttons && data.buttons.length > 0 ? (
                data.buttons.map((btn: any, i: number) => (
                  <Link
                    key={i}
                    href={btn.link}
                    className={i === 0 ? styles.primaryBtn : styles.secondaryBtn}
                  >
                    {btn.label}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/donar" className={styles.primaryBtn}>
                    Donar ahora
                  </Link>
                  <Link href="/programas" className={styles.secondaryBtn}>
                    Nuestros programas
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
