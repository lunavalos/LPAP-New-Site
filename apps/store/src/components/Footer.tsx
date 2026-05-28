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
              <a href="https://www.facebook.com/LPAPFIGHT/?locale=es_LA" target="_blank" rel="noopener noreferrer" className={`${styles.socialBubble} ${styles.facebook}`} aria-label="Facebook">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/luchandoporangelespequenos/?hl=es" target="_blank" rel="noopener noreferrer" className={`${styles.socialBubble} ${styles.instagram}`} aria-label="Instagram">
                <svg stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/528442281480?" target="_blank" rel="noopener noreferrer" className={`${styles.socialBubble} ${styles.whatsapp}`} aria-label="WhatsApp">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                </svg>
              </a>
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
