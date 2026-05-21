'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  User, 
  Image as ImageIcon, 
  Tag, 
  Package, 
  ShoppingCart, 
  FileText, 
  LogOut,
  ChevronLeft
} from 'lucide-react'
import { useAuth } from '@payloadcms/ui'

import './index.css'

const Nav: React.FC = () => {
  const pathname = usePathname()
  const { logOut } = useAuth()

  const navItems = [
    {
      label: 'Actividades',
      href: '/admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Administradores',
      href: '/admin/collections/users',
      icon: <User size={20} />,
    },
    {
      label: 'Clientes',
      href: '/admin/collections/customers',
      icon: <User size={20} />,
    },
    {
      label: 'Media',
      href: '/admin/collections/media',
      icon: <ImageIcon size={20} />,
    },
    {
      label: 'Categorias',
      href: '/admin/collections/categories',
      icon: <Tag size={20} />,
    },
    {
      label: 'Productos',
      href: '/admin/collections/products',
      icon: <Package size={20} />,
    },
    {
      label: 'Órdenes',
      href: '/admin/collections/orders',
      icon: <ShoppingCart size={20} />,
    },
    {
      label: 'Páginas',
      href: '/admin/collections/pages',
      icon: <FileText size={20} />,
    },
  ]

  const globalItems = [
    {
      label: 'Configuración',
      href: '/admin/globals/site-settings',
      icon: <Tag size={20} />,
    },
    {
      label: 'Navegación',
      href: '/admin/globals/header',
      icon: <FileText size={20} />,
    },
    {
      label: 'Pie de Página',
      href: '/admin/globals/footer',
      icon: <FileText size={20} />,
    },
  ]

  return (
    <nav className="custom-nav">
      <div className="nav-header">
        <button className="back-button">
          <ChevronLeft size={18} />
        </button>
        <span className="nav-title">GESTIÓN DE CONTENIDO</span>
      </div>

      <div className="nav-links">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        })}

        <div className="nav-section-title">GLOBALES</div>

        {globalItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`nav-item global-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="nav-footer">
        <button className="nav-item logout-button" onClick={() => logOut()}>
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-label">Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  )
}

export default Nav
