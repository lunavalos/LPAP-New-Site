'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { ShoppingBag, MapPin, User, ArrowRight } from 'lucide-react'
import styles from './Dashboard.module.css'

export default function DashboardPage() {
  const { user } = useAuth()

  const cards = [
    { 
      title: 'Mis Pedidos', 
      desc: 'Revisa el historial y estatus de tus compras.', 
      href: '/app/orders', 
      icon: <ShoppingBag size={24} />,
      color: '#f4852b'
    },
    { 
      title: 'Direcciones', 
      desc: 'Gestiona tus lugares de entrega favoritos.', 
      href: '/app/addresses', 
      icon: <MapPin size={24} />,
      color: '#00c853'
    },
    { 
      title: 'Perfil', 
      desc: 'Actualiza tus datos personales y contacto.', 
      href: '/app/profile', 
      icon: <User size={24} />,
      color: '#2196f3'
    },
  ]

  return (
    <div className={styles.pageContent}>
      <header className={styles.header}>
        <h1 className={styles.welcomeTitle}>Hola, {user?.name.split(' ')[0]} 👋</h1>
        <p className={styles.welcomeSubtitle}>Gestiona tu cuenta y revisa tus pedidos desde aquí.</p>
      </header>

      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <Link href={card.href} key={card.href} className={styles.statCard}>
            <div className={styles.cardIcon} style={{ color: card.color, background: `${card.color}15` }}>
              {card.icon}
            </div>
            <div className={styles.cardInfo}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
            <ArrowRight size={20} className={styles.cardArrow} />
          </Link>
        ))}
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Actividad Reciente</h2>
        <div className={styles.emptyState}>
          <p>Próximamente verás aquí tus últimos pedidos y actualizaciones.</p>
        </div>
      </div>
    </div>
  )
}
