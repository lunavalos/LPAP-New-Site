'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  X,
  ArrowRight,
  Heart,
  Pill,
  ShoppingBasket,
  Milk,
  Gift,
  Ticket,
  HandHeart,
  Bus,
  Gamepad2,
  Waves,
  Users,
} from 'lucide-react'
import styles from './ProgramsGrid.module.css'

interface Program {
  id: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  color: string
  bg: string
  text: string
  details?: string[]
  note?: string
  image?: string
}

const PROGRAMS_DATA: Program[] = [
  {
    id: 'apoyo-a-la-vida',
    Icon: Pill,
    title: 'Apoyo a la Vida',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'Cubrimos medicamentos oncológicos, quimioterapias, estudios médicos de alta especialidad y exámenes previos a trasplante de médula ósea.',
    details: [
      'Quimioterapias y medicamentos oncológicos',
      'Estudios médicos especializados',
      'Exámenes previos a trasplante de médula',
      'Gastos hospitalarios urgentes',
    ],
    note: 'Los tratamientos fluctúan entre $10,000 y $60,000 MXN según cada caso, evaluados con estudio socioeconómico garantizando el apoyo a quienes más lo necesitan.',
    image: '/img/apoyo-a-la-vida.webp',
  },
  {
    id: 'despensas-y-sonrisas',
    Icon: ShoppingBasket,
    title: 'Despensas y Sonrisas',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.08)',
    text: 'Cada mes entregamos despensas nutritivas y surtidas con productos de necesidad básica, artículos de higiene y elementos de seguridad para las familias de nuestros guerreros.',
    details: [
      'Despensas mensuales con alimentos básicos',
      'Artículos de higiene personal',
      'Productos de seguridad e higiene',
    ],
    image: '/img/despensas-y-sonrisas.webp',
  },
  {
    id: 'pediasure',
    Icon: Milk,
    title: 'Nutrición · Pediasure',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.08)',
    text: 'La quimioterapia elimina el apetito de los niños. Suministramos Pediasure para asegurar la nutrición necesaria y que puedan continuar con su tratamiento.',
    details: [
      'Suplemento nutricional especializado',
      'Apoya durante la pérdida de apetito',
      'Permite continuar con el tratamiento',
    ],
    image: '/img/pediasure.webp',
  },
  {
    id: 'dia-del-nino-y-navidad',
    Icon: Gift,
    title: 'Día del Niño y Navidad',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'En estos días especiales organizamos actividades recreativas y entregamos regalos para sacar a los guerreros de la rutina de hospitales y medicamentos.',
    details: [
      'Actividades y celebraciones especiales',
      'Regalos personalizados',
      'Momentos de diversión y alegría',
    ],
    image: '/img/dia-del-nino.webp',
  },
  {
    id: 'rifas-y-suenos',
    Icon: Ticket,
    title: 'Rifas y Sueños',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.08)',
    text: 'Una vez al mes rifamos regalos especiales entre niños con cáncer de todo el país y el mundo. Hemos llegado a Monterrey, CDMX, Chihuahua, León y hasta Estados Unidos.',
    details: [
      'Rifas mensuales a nivel nacional e internacional',
      'Abierto a todos los guerreros contra el cáncer',
      'Entrega de regalos especiales',
    ],
    image: '/img/rifas-y-suenos.webp',
  },
  {
    id: 'reconforta',
    Icon: HandHeart,
    title: 'Reconforta en Amor',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.08)',
    text: 'Brindamos apoyo emocional, tanatológico y acompañamiento integral a familias con pacientes en estado terminal, haciendo sus últimos días especiales.',
    details: [
      'Decoración temática del cuarto',
      'Regalos según deseos del paciente',
      'Acompañamiento tanatológico',
      'Comida favorita del guerrero',
    ],
    image: '/img/reconforta-desktop.webp',
  },
  {
    id: 'subsidio-de-transporte',
    Icon: Bus,
    title: 'Subsidio de Transporte',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'Cubrimos el viaje redondo (autobús o avión) de pacientes foráneos que deben desplazarse a otras ciudades para recibir quimioterapias o trasplante de médula.',
    details: [
      'Traslado en autobús o avión',
      'Para pacientes de otras ciudades',
      'Cubre el viaje redondo completo',
    ],
    image: '/img/subsidio-de-transporte-desktop.webp',
  },
  {
    id: 'ludotecas-lpap',
    Icon: Gamepad2,
    title: 'Ludotecas LPAP',
    color: 'var(--accent)',
    bg: 'rgba(220,93,163,0.08)',
    text: 'Equipamos espacios de juego dentro de hospitales donde los niños pueden jugar, leer, aprender y soñar. Ya operamos en Tepic, Nayarit y expandimos a más estados.',
    details: [
      'Espacios de juego dentro de hospitales',
      'Operamos en Tepic, Nayarit (IMSS)',
      'Próximamente: Cd. Obregón, S.L.P., León y Aguascalientes',
    ],
    image: '/img/ludotecas.webp',
  },
  {
    id: 'empapando-suenos',
    Icon: Waves,
    title: 'Empapando Sueños',
    color: 'var(--secondary)',
    bg: 'rgba(73,159,208,0.08)',
    text: 'Viaje a Cancún organizado con Fundación Palace, donde nuestros beneficiarios y sus familias disfrutan una experiencia de felicidad, descanso y unión familiar.',
    details: [
      'Viaje todo incluido a Cancún',
      'En conjunto con Fundación Palace',
      'Para beneficiarios y sus familias',
    ],
    image: '/img/empapando-suenos.webp',
  },
  {
    id: 'voluntariado-en-hospital',
    Icon: Users,
    title: 'Voluntariado en Hospital',
    color: 'var(--primary)',
    bg: 'rgba(244,133,43,0.08)',
    text: 'Nuestro equipo de voluntarios visita hospitales para realizar actividades recreativas con niños en ambulatoria o internados, brindando compañía y apoyo emocional.',
    details: [
      'Visitas regulares a hospitales',
      'Actividades recreativas y educativas',
      'Apoyo emocional a pacientes internados',
    ],
    image: '/img/voluntariado-en-hospital.webp',
  },
]

export default function ProgramsGrid() {
  const [activeProgram, setActiveProgram] = useState<Program | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Sync state with HTML dialog element
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (activeProgram) {
      dialog.showModal()
      document.body.style.overflow = 'hidden' // Prevent page scrolling
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }

    // Handle ESC key listener natively from dialog
    const handleCancel = (e: Event) => {
      e.preventDefault()
      closeModal()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      document.body.style.overflow = ''
    }
  }, [activeProgram])

  const closeModal = () => {
    setActiveProgram(null)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // If user clicked directly on the dialog wrapper (backdrop), close it
    if (e.target === dialogRef.current) {
      closeModal()
    }
  }

  return (
    <>
      {/* ── Grid of Cards ── */}
      <div className={styles.grid}>
        {PROGRAMS_DATA.map((program) => {
          const { id, Icon, title, color, bg, text } = program
          return (
            <div
              key={id}
              className={styles.card}
              id={id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveProgram(program)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveProgram(program)
                }
              }}
              aria-haspopup="dialog"
            >
              <div className={styles.cardAccent} style={{ backgroundColor: color }} />
              <div className={styles.iconWrap} style={{ background: bg, color }}>
                <Icon size={24} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
              
              <div className={styles.cardFooter} style={{ color }}>
                <span>Conocer más</span>
                <ArrowRight size={16} className={styles.arrowIcon} />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Lightbox Dialog Modal ── */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={handleBackdropClick}
        aria-modal="true"
      >
        {activeProgram && (
          <div className={styles.modalContent}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className={styles.closeBtn}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <div className={styles.columns}>
              {/* Column 1: Complete Information */}
              <div className={styles.infoCol}>
                <div className={styles.modalHeader}>
                  <div
                    className={styles.modalIconWrap}
                    style={{
                      background: activeProgram.bg,
                      color: activeProgram.color,
                    }}
                  >
                    <activeProgram.Icon size={28} />
                  </div>
                  <h2 className={styles.modalTitle}>{activeProgram.title}</h2>
                </div>

                <div className={styles.divider} />

                <div className={styles.modalBody}>
                  <p className={styles.modalDesc}>{activeProgram.text}</p>

                  {activeProgram.details && activeProgram.details.length > 0 && (
                    <div className={styles.detailsSection}>
                      <h4 className={styles.detailsTitle}>¿Qué incluye este programa?</h4>
                      <ul className={styles.detailList}>
                        {activeProgram.details.map((detail, index) => (
                          <li key={index} className={styles.detailItem}>
                            <span
                              className={styles.detailDot}
                              style={{ background: activeProgram.color }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeProgram.note && (
                    <div className={styles.noteBox}>
                      <p className={styles.noteText}>{activeProgram.note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Column 2: Program Image */}
              <div className={styles.imageCol}>
                {activeProgram.image ? (
                  <img
                    src={activeProgram.image}
                    alt={activeProgram.title}
                    className={styles.modalImage}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <Heart size={48} style={{ color: activeProgram.color }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
