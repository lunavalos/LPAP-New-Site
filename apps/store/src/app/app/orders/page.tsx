'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Package, ChevronRight, Clock } from 'lucide-react'
import styles from '../Dashboard.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function OrdersPage() {
  const { user, getAuthHeaders } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${PAYLOAD_URL}/api/orders?where[account][equals]=${user?.id}&sort=-createdAt`, {
          headers: getAuthHeaders(),
        })
        const data = await res.json()
        setOrders(data.docs || [])
      } catch (e) {
        console.error('Error fetching orders', e)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchOrders()
  }, [user])

  const formatPrice = (val: number) => new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(val)

  const getStatusLabel = (status: string) => {
    const statuses: any = {
      pending: { label: 'Pendiente', color: '#f4852b' },
      paid: { label: 'Pagado', color: '#00c853' },
      processing: { label: 'En proceso', color: '#2196f3' },
      shipped: { label: 'Enviado', color: '#9c27b0' },
      delivered: { label: 'Entregado', color: '#4caf50' },
      cancelled: { label: 'Cancelado', color: '#f44336' },
    }
    return statuses[status] || { label: status, color: '#888' }
  }

  return (
    <div className={styles.pageContent}>
      <header className={styles.header}>
        <h1 className={styles.welcomeTitle}>Mis Pedidos</h1>
        <p className={styles.welcomeSubtitle}>Historial de todas tus compras realizadas.</p>
      </header>

      {loading ? (
        <div className={styles.loadingOrders}>Cargando tus pedidos...</div>
      ) : orders.length === 0 ? (
        <div className={styles.emptyOrders}>
          <Package size={48} />
          <p>Aún no has realizado ningún pedido.</p>
          <a href="/tienda" className={styles.shopLink}>Ir a la tienda</a>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => {
            const status = getStatusLabel(order.status)
            return (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>#{order.id.slice(-6).toUpperCase()}</span>
                    <span className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <div className={styles.orderStatus} style={{ color: status.color, background: `${status.color}15` }}>
                    {status.label}
                  </div>
                </div>

                <div className={styles.orderItemsPreview}>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className={styles.orderItem}>
                      {item.imageUrl && <img src={item.imageUrl.startsWith('http') ? item.imageUrl : `${PAYLOAD_URL}${item.imageUrl}`} alt="" />}
                      <span>{item.title} x {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.orderTotal}>
                    <span>Total</span>
                    <strong>{formatPrice(order.total)}</strong>
                  </div>
                  <button className={styles.detailLink}>
                    Detalles <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
