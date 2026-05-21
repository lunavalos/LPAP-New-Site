'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import CartDrawer from './cart/CartDrawer'
import { Menu, X, ShoppingBag, User } from 'lucide-react'
import styles from './Navbar.module.css'

interface NavbarClientProps {
  navItems: any[]
  siteSettings: any
}

export default function NavbarClient({ navItems, siteSettings }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoUrl = siteSettings?.logo?.url 
    ? `http://localhost:3000${siteSettings.logo.url}` 
    : null

  const { totalItems, toggleCart } = useCart()
  const { user } = useAuth()

  return (
    <>
      <CartDrawer />
      <header className={`${styles.navbarContainer} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navbarWrapper}>
            <Link href="/" className={styles.logo}>
              {logoUrl ? (
                <img src={logoUrl} alt="LPAP Logo" className={styles.logoImg} />
              ) : (
                <span className={styles.logoText}>LPAP</span>
              )}
            </Link>

            <nav className={styles.navMenu}>
              {navItems?.map((item: any, i: number) => {
                const slug = item.link.reference?.slug || ''
                const href = item.link.type === 'reference' 
                  ? (slug === 'inicio' || slug === 'home' ? '/' : `/${slug}`) 
                  : item.link.url
                return (
                  <Link key={i} href={href} className={styles.navLink}>
                    {item.link.label}
                  </Link>
                )
              })}
            </nav>

            <div className={styles.navbarActions}>
              <div className={styles.desktopActions}>
                <button className={styles.cartIconBtn} onClick={toggleCart} title="Bolsa de compra">
                  <ShoppingBag size={22} />
                  {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                </button>
                {user ? (
                  <Link href="/app" className={styles.orangeBtn}>
                    <User size={18} /> Mi Cuenta
                  </Link>
                ) : (
                  <Link href="/login" className={styles.orangeBtn}>
                    Iniciar Sesión
                  </Link>
                )}
                <Link href="/donar" className={styles.donateBtn}>
                  Donar ahora
                </Link>
              </div>
              
              <button className={styles.cartIconBtnMobile} onClick={toggleCart}>
                <ShoppingBag size={22} />
                {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
              </button>
              
              <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Mobile Menu Overlay - Ahora dentro de wrapper para el ancho */}
              <div className={`${styles.mobileOverlay} ${isOpen ? styles.overlayOpen : ''}`}>
                <div className={styles.overlayContent}>
                  <nav className={styles.overlayNav}>
                    {navItems?.map((item: any, i: number) => {
                      const slug = item.link.reference?.slug || ''
                      const href = item.link.type === 'reference' 
                        ? (slug === 'inicio' || slug === 'home' ? '/' : `/${slug}`) 
                        : item.link.url
                      return (
                        <Link key={i} href={href} className={styles.overlayLink} onClick={() => setIsOpen(false)}>
                          {item.link.label}
                        </Link>
                      )
                    })}
                  </nav>
                  
                  <div className={styles.overlayFooter}>
                    {user ? (
                      <Link href="/app" className={styles.orangeBtn} onClick={() => setIsOpen(false)}>
                        <User size={18} /> Mi Cuenta
                      </Link>
                    ) : (
                      <Link href="/login" className={styles.orangeBtn} onClick={() => setIsOpen(false)}>
                        Iniciar Sesión
                      </Link>
                    )}
                    <Link href="/donar" className={styles.donateBtn} onClick={() => setIsOpen(false)}>
                      Donar ahora
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
