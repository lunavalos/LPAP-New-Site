import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './Hero.module.css'

interface HeroProps {
  data: any
}

export default function Hero({ data }: HeroProps) {
  if (!data) return null

  const heroBlock = data.layout?.find((block: any) => block.blockType === 'hero')
  if (!heroBlock) return null

  const { title, subtitle, backgroundImage, buttons } = heroBlock

  const imgUrl = backgroundImage?.url 
    ? `http://localhost:3000${backgroundImage.url}` 
    : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070'

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{title || 'Cambiando Vidas, Juntos.'}</h1>
            <p className={styles.heroSubtitle}>{subtitle || 'Lucha Por Ángeles Pequeños A.C. se dedica a brindar apoyo integral a niños y familias en situaciones de vulnerabilidad.'}</p>
            
            <div className={styles.heroBtns}>
              {buttons && buttons.length > 0 ? (
                buttons.map((btn: any, i: number) => (
                  <Link 
                    key={i} 
                    href={btn.link} 
                    className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline'}`}
                    style={i === 0 ? { backgroundColor: '#DC5DA3', color: '#fff' } : { color: '#fff', borderColor: '#fff' }}
                  >
                    {btn.label}
                    {i === 0 && <ArrowRight size={20} style={{ marginLeft: '12px' }} />}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/donar" className="btn btn-primary" style={{ backgroundColor: '#DC5DA3', color: '#fff' }}>
                    Donar ahora
                    <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                  </Link>
                  <Link href="/nosotros" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
                    Saber más
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <img 
              src={imgUrl} 
              alt={title || 'LPAP Hero'} 
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
