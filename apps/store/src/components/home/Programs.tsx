'use client'

import React from 'react'
import { Pill, Bus, Milk, Gift, Ticket, HandHeart, Gamepad2, ShoppingBag } from 'lucide-react'
import styles from './Programs.module.css'

const PROGRAMS_DATA = [
  {
    Icon: Pill,
    title: 'Apoyo a la Vida',
    text: 'Cubrimos medicamentos oncológicos, quimioterapias, estudios médicos de alta especialidad y gastos hospitalarios urgentes.',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.06)',
  },
  {
    Icon: Gamepad2,
    title: 'Ludotecas Hospitalarias',
    text: 'Equipamos espacios de juego interactivos dentro de los hospitales para llevar alegría y distracción durante sus tratamientos.',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.06)',
  },
  {
    Icon: HandHeart,
    title: 'Reconforta en Amor',
    text: 'Brindamos acompañamiento emocional, tanatológico y apoyo integral a familias con pacientes en etapa terminal.',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.06)',
  },
  {
    Icon: Bus,
    title: 'Subsidio de Transporte',
    text: 'Apoyo económico directo para el traslado seguro de los niños y un acompañante a sus citas médicas y tratamientos.',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.06)',
  },
  {
    Icon: Milk,
    title: 'Nutrición · Pediasure',
    text: 'Suministramos suplementos alimenticios especializados para asegurar la óptima nutrición de los guerreros en tratamiento.',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.06)',
  },
  {
    Icon: ShoppingBag,
    title: 'Despensas Familiares',
    text: 'Entrega mensual de despensas completas con alimentos básicos y artículos de higiene para familias vulnerables.',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.06)',
  },
]

export default function Programs() {
  return (
    <section className={styles.section}>
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Programas de Apoyo</span>
          <h2 className={styles.headerTitle}>
            Cómo LPAP transforma el camino juntos
          </h2>
          <p className={styles.headerSub}>
            Implementamos un sistema de soporte integral que cubre las necesidades médicas, nutricionales, emocionales y recreativas de los guerreros y sus familias.
          </p>
        </div>

        {/* Beautiful Elegant Grid Section */}
        <div className={styles.grid}>
          {PROGRAMS_DATA.map(({ Icon, title, text, color, bg }, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardAccent} style={{ backgroundColor: color }} />
              <div className={styles.iconWrap} style={{ background: bg, color }}>
                <Icon size={24} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
