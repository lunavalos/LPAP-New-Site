import React from 'react'
import Link from 'next/link'
import { getGlobal } from '@/lib/payload'
import { 
  Mail, 
  MapPin, 
  Phone, 
  Heart, 
  Globe, 
  Share2,
  ShoppingBag,
  Tag,
  Coffee,
  Sparkles,
  BookOpen,
  Home,
  Users,
  Layers,
  MessageSquare
} from 'lucide-react'
import styles from './Footer.module.css'

function getNavIcon(label: string, slug: string) {
  const normLabel = label.toLowerCase();
  const normSlug = slug.toLowerCase();
  
  if (normSlug.includes('inicio') || normSlug.includes('home') || normLabel.includes('inicio') || normLabel.includes('home')) {
    return <Home size={14} color="#fff" style={{ opacity: 0.9 }} />;
  }
  if (normSlug.includes('nosotros') || normLabel.includes('nosotros') || normLabel.includes('quienes') || normLabel.includes('quiénes')) {
    return <Users size={14} color="#fff" style={{ opacity: 0.9 }} />;
  }
  if (normSlug.includes('programa') || normLabel.includes('programa')) {
    return <Layers size={14} color="#fff" style={{ opacity: 0.9 }} />;
  }
  if (normSlug.includes('tienda') || normLabel.includes('tienda') || normSlug.includes('product') || normLabel.includes('product') || normLabel.includes('catalogo') || normLabel.includes('catálogo')) {
    return <ShoppingBag size={14} color="#fff" style={{ opacity: 0.9 }} />;
  }
  if (normSlug.includes('donar') || normLabel.includes('donar') || normLabel.includes('apoyo')) {
    return <Heart size={14} color="#fff" style={{ opacity: 0.9 }} />;
  }
  if (normSlug.includes('contacto') || normLabel.includes('contacto')) {
    return <Mail size={14} color="#fff" style={{ opacity: 0.9 }} />;
  }
  return <Sparkles size={14} color="#fff" style={{ opacity: 0.9 }} />;
}

export default async function Footer() {
  let siteSettings = null
  let navData = { navItems: [] }
  try {
    [siteSettings, navData] = await Promise.all([
      getGlobal('site-settings'),
      getGlobal('header')
    ])
  } catch (e) {
    console.error('Footer: Error fetching site settings & header', e)
  }

  const { contact } = siteSettings || {}
  const navItems = navData?.navItems || []

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.col}>
            <h3 className={styles.logoTitle}>LPAP A.C.</h3>
            <p className={styles.logoText}>
              Lucha Por Ángeles Pequeños A.C. es una organización dedicada a brindar apoyo a niños en situaciones vulnerables.
            </p>
            <div className={styles.socials}>
              <Link href="#" className={styles.socialLink} aria-label="Donar"><Heart size={20} /></Link>
              <Link href="#" className={styles.socialLink} aria-label="Sitio Web"><Globe size={20} /></Link>
              <Link href="#" className={styles.socialLink} aria-label="Compartir"><Share2 size={20} /></Link>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Enlaces Rápidos</h4>
            <ul className={styles.list}>
              {navItems.map((item: any, i: number) => {
                const slug = item.link.reference?.slug || ''
                const href = item.link.type === 'reference' 
                  ? (slug === 'inicio' || slug === 'home' ? '/' : `/${slug}`) 
                  : item.link.url
                return (
                  <li key={i}>
                    <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {getNavIcon(item.link.label, slug)}
                      <span>{item.link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Tienda Solidaria</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/tienda" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={14} color="#fff" style={{ opacity: 0.9 }} /> <span>Todos los Productos</span>
                </Link>
              </li>
              <li>
                <Link href="/tienda?category=accesorios" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Tag size={14} color="#fff" style={{ opacity: 0.9 }} /> <span>Accesorios</span>
                </Link>
              </li>
              <li>
                <Link href="/tienda?category=hogar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Coffee size={14} color="#fff" style={{ opacity: 0.9 }} /> <span>Hogar y Termos</span>
                </Link>
              </li>
              <li>
                <Link href="/tienda?category=coleccionables" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} color="#fff" style={{ opacity: 0.9 }} /> <span>Coleccionables</span>
                </Link>
              </li>
              <li>
                <Link href="/tienda?category=literatura" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={14} color="#fff" style={{ opacity: 0.9 }} /> <span>Libros y Literatura</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={20} color="#fff" style={{ flexShrink: 0, opacity: 0.9 }} />
                <span>{contact?.address || 'Saltillo, Coahuila'}</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={20} color="#fff" style={{ flexShrink: 0, opacity: 0.9 }} />
                <span>{contact?.phone || '(844) 228-1480'}</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={20} color="#fff" style={{ flexShrink: 0, opacity: 0.9 }} />
                <span>{contact?.email || 'contacto@lpap.com.mx'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.avisos}>
          <div className={styles.copyright}>
            <p>© {new Date().getFullYear()} LPAP A.C. Todos los derechos reservados.</p>
            <a href="/politicas-de-privacidad">Politicas de privacidad</a><br />
            <a href="/aviso-de-derechos-reservados">Aviso de derechos reservados</a>
          </div>

          <div className={styles.desarrollado}>
            <h3>Desarrollado por:</h3>
            <img src="/img/credits-logo.png" alt="LunaValos" className={styles.creditsLogo} />
          </div>
        </div>
      </div>
    </footer>
  )
}
