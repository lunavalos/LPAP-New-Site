'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { ShoppingBag, MapPin, User, ArrowRight, Package } from 'lucide-react'
import styles from './Dashboard.module.css'

export default function DashboardPage() {
  const { user, getAuthHeaders } = useAuth()
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
        const res = await fetch(`${PAYLOAD_URL}/api/orders?where[account][equals]=${user?.id}&sort=-createdAt&limit=3`, {
          headers: getAuthHeaders(),
        })
        const data = await res.json()
        setRecentOrders(data.docs || [])
      } catch (e) {
        console.error('Error fetching recent orders', e)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchRecentOrders()
  }, [user])

  const formatPrice = (val: number) => new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(val)

  const getPaymentStatusLabel = (status: string) => {
    const statuses: any = {
      pending: { label: 'Pendiente', color: '#f4852b' },
      paid: { label: 'Pagado', color: '#00c853' },
      failed: { label: 'Fallido', color: '#f44336' },
      refunded: { label: 'Reembolsado', color: '#9c27b0' },
    }
    return statuses[status] || { label: status, color: '#888' }
  }

  const getDeliveryStatusLabel = (status: string) => {
    const statuses: any = {
      pending: { label: 'Pendiente', color: '#f4852b' },
      processing: { label: 'En proceso', color: '#2196f3' },
      shipped: { label: 'Enviado', color: '#9c27b0' },
      delivered: { label: 'Entregado', color: '#4caf50' },
      cancelled: { label: 'Cancelado', color: '#f44336' },
    }
    return statuses[status] || { label: status, color: '#888' }
  }

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
        <h1 className={styles.welcomeTitle}>Hola, {user?.name ? user.name.split(' ')[0] : 'Guerrero'} 👋</h1>
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
        <h2 className={styles.sectionTitle}>Última Actividad</h2>
        {loading ? (
          <div style={{ padding: '24px 0', color: '#888', fontSize: '14px', textAlign: 'center' }}>
            Cargando actividad reciente...
          </div>
        ) : recentOrders.length > 0 ? (
          <div className={styles.recentOrdersList} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {recentOrders.map((order: any) => {
              const payStatus = getPaymentStatusLabel(order.paymentStatus)
              const delStatus = getDeliveryStatusLabel(order.deliveryStatus)
              const firstItem = order.items?.[0]
              const orderTitle = firstItem
                ? (order.items.length > 1
                    ? `${firstItem.title} y +${order.items.length - 1} más`
                    : firstItem.title)
                : `Pedido #${order.id.slice(-6).toUpperCase()}`

              return (
                <div key={order.id} className={styles.recentOrderRow} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#fff',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: '800', fontSize: '14px', color: '#111' }}>
                      {orderTitle}
                    </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                      {new Date(order.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })} • #{order.id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontWeight: '800', color: '#f4852b', fontSize: '14px' }}>
                      {formatPrice(order.total)}
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '800',
                        color: payStatus.color,
                        background: `${payStatus.color}12`
                      }}>
                        Pago: {payStatus.label}
                      </span>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '800',
                        color: delStatus.color,
                        background: `${delStatus.color}12`
                      }}>
                        Envío: {delStatus.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
            <Link href="/app/orders" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#f4852b',
              fontWeight: '700',
              fontSize: '14px',
              textDecoration: 'none',
              marginTop: '8px',
              alignSelf: 'flex-start'
            }}>
              Ver todos los pedidos <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Aún no tienes pedidos registrados. ¡Apoya a nuestros guerreros comprando en la tienda!</p>
            <Link href="/tienda" className={styles.shopLink} style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '10px 20px',
              background: '#f4852b',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '13px'
            }}>
              Ir a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
