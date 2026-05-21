'use client'

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { User, ShoppingBag, MapPin, LogOut, LayoutDashboard } from 'lucide-react'
import styles from './Dashboard.module.css'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${pathname}`)
    }
  }, [user, loading, router, pathname])

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  )

  if (!user) return null

  const menuItems = [
    { label: 'Escritorio', href: '/app', icon: <LayoutDashboard size={20} /> },
    { label: 'Mis Pedidos', href: '/app/orders', icon: <ShoppingBag size={20} /> },
    { label: 'Direcciones', href: '/app/addresses', icon: <MapPin size={20} /> },
    { label: 'Perfil', href: '/app/profile', icon: <User size={20} /> },
  ]

  return (
    <div className={styles.appWrapper}>
      <div className="container">
        <div className={styles.appGrid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userSection}>
              <div className={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{user?.name || 'Usuario'}</p>
                <p className={styles.userEmail}>{user?.email}</p>
              </div>
            </div>

            <nav className={styles.sideNav}>
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <button onClick={logout} className={styles.logoutBtn}>
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </aside>

          {/* Content */}
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
