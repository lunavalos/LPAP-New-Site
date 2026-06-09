import React from 'react'
import ContactForm from '@/components/home/ContactForm'
import styles from './Contacto.module.css'

export const metadata = {
  title: 'Contacto - Lucha Por Ángeles Pequeños',
  description: 'Contáctanos para solicitar tu recibo deducible de impuestos, hacer una donación o solicitar apoyo.',
}

export default function ContactoPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>Contacto</span>
            <h1 className={styles.heroTitle}>
              Ponte en <span className={styles.heroAccent}>contacto</span> con nosotros
            </h1>
            <p className={styles.heroSub}>
              ¿Tienes dudas sobre donativos, recibos deducibles o necesitas ayuda? 
              Estamos aquí para escucharte y guiarte en cada paso.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <ContactForm />
    </main>
  )
}
