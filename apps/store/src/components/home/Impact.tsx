'use client'

import React from 'react'
import { Users, Baby, HandHeart, CalendarHeart } from 'lucide-react'
import styles from './Impact.module.css'

const stats = [
  {
    Icon: Baby,
    number: '+1,000',
    label: 'Niños Beneficiados',
    sub: 'Guerreros apoyados en sus tratamientos desde 2015',
  },
  {
    Icon: Users,
    number: '+5,000',
    label: 'Familias Asistidas',
    sub: 'Familias de bajos recursos acompañadas integralmente',
  },
  {
    Icon: HandHeart,
    number: '+10,000',
    label: 'Apoyos Entregados',
    sub: 'Medicamentos, despensas, traslados y apoyos en especie',
  },
  {
    Icon: CalendarHeart,
    number: '10 Años',
    label: 'De Labor Continua',
    sub: 'Luchando cada día desde Saltillo, Coahuila para todo México',
  },
]

export default function Impact() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Nuestro Impacto</span>
          <h2 className={styles.title}>
            10 años cambiando vidas en México
          </h2>
        </div>

        <div className={styles.grid}>
          {stats.map(({ Icon, number, label, sub }, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon size={28} />
              </div>
              <div className={styles.number}>{number}</div>
              <div className={styles.label}>{label}</div>
              <div className={styles.sub}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
