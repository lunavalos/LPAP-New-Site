import React from 'react'
import { Heart, Users, Star, Check } from 'lucide-react'
import styles from './Features.module.css'

export default function Features() {
  const items = [
    {
      title: 'Transparencia Total',
      desc: 'Cada peso donado llega directamente a programas de apoyo para niños y sus familias.',
      icon: <Heart size={32} />
    },
    {
      title: 'Comunidad Unida',
      desc: 'Formamos una red de voluntarios y aliados comprometidos con el bienestar infantil.',
      icon: <Users size={32} />
    },
    {
      title: 'Impacto Real',
      desc: 'Más de 10 años transformando el futuro de pequeños ángeles en Saltillo y alrededores.',
      icon: <Star size={32} />
    }
  ]

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featuresGrid}>
          <div className={styles.featureCardMain}>
            <div className={styles.cardTag}>¿Cómo puedes ayudar?</div>
            <h2 className={styles.cardTitle}>ÚNETE A NUESTRA CAUSA</h2>
            <ul className={styles.cardList}>
              <li><Check size={18} /> Donaciones en especie o efectivo</li>
              <li><Check size={18} /> Programa de voluntariado</li>
              <li><Check size={18} /> Alianzas empresariales</li>
            </ul>
            <button className="btn btn-primary" style={{ backgroundColor: 'var(--secondary)' }}>Saber más</button>
          </div>

          <div className={styles.featureItems}>
            {items.map((item, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={styles.itemIcon}>{item.icon}</div>
                <div className={styles.itemContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
