'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, CreditCard, Sparkles, ShieldCheck, Award, Copy, Check, ExternalLink } from 'lucide-react'
import Blocks from '@/components/Blocks'
import styles from '../app/donar/page.module.css'

interface Product {
  title: string
  price: number
  slug: string
  images?: { image?: { url?: string } }[]
  description?: string
  category?: { title: string } | string
}

interface DonarClientProps {
  pageData: any
  products: Product[]
}

const SUGGESTIONS = [
  {
    amount: 150,
    label: 'Suplementos',
    text: 'Apoya con 1 Suplemento Alimenticio de alta nutrición para el fortalecimiento físico de un guerrero.',
  },
  {
    amount: 500,
    label: 'Estudios',
    text: 'Financia 1 Estudio de Laboratorio o Análisis Clínico completo de monitoreo de células sanguíneas.',
  },
  {
    amount: 1500,
    label: 'Quimioterapia',
    text: 'Cubre el costo de insumos médicos para 1 Sesión de Quimioterapia y tratamiento activo.',
  },
  {
    amount: 5000,
    label: 'Acompañamiento',
    text: 'Aporta para un Ciclo Integral de Apoyo en Ludotecas, asesoría nutricional y soporte psicológico familiar.',
  },
]

export default function DonarClient({ pageData, products }: DonarClientProps) {
  const [activeIdx, setActiveIdx] = useState(2) // Default to $1500 MXN
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Separate hero blocks (render at top) from the rest
  const heroBlocks = pageData?.layout?.filter(
    (b: any) => b.blockType === 'hero' || b.blockType === 'hero-slider'
  ) || []
  const otherBlocks = pageData?.layout?.filter(
    (b: any) => b.blockType !== 'hero' && b.blockType !== 'hero-slider'
  ) || []

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  const bankDetails = [
    { label: 'Nombre de la cuenta', val: 'Donativos LPAP luchando por angeles pequeños a.c.' },
    { label: 'Banco', val: 'Banbajio' },
    { label: 'Clabe Interbancaria', val: '030240900006126973' },
    { label: 'Cuenta', val: '0144540030201' },
  ]

  // Use CMS data if available, otherwise fallbacks
  const displayTitle = pageData?.title || 'Tu generosidad es la cura de un guerrero'
  const displaySubtitle = pageData?.description || 'El 100% de tu donativo se destina directamente al tratamiento médico, medicamentos oncológicos, estudios clínicos, acompañamiento integral y ludotecas móviles para niños de familias de bajos recursos en México.'

  return (
    <main
      className={styles.main}
      style={heroBlocks.length > 0 ? { paddingTop: 0 } : undefined}
    >
      {/* ── Hero blocks from CMS: always at top, full-width ── */}
      {heroBlocks.length > 0 && (
        <Blocks layout={heroBlocks} products={products} />
      )}

      <div className="container">
        
        {/* ── Hero Section ── */}


        {/* ── Main Donation Buttons Grid ── */}
        <section className={styles.grid}>
          
          {/* Card 1: Mercado Pago */}
          <div className={`${styles.card} ${styles.mpCard}`}>
            <div className={`${styles.iconWrap} ${styles.mpIcon}`}>
              <Sparkles size={36} />
            </div>
            <h2 className={styles.cardTitle}>Donación Nacional</h2>
            <p className={styles.cardDesc}>
              Ideal para aportaciones rápidas y únicas en pesos mexicanos (MXN) con tarjeta de débito/crédito, 
              transferencias en segundos o utilizando tu saldo de Mercado Pago.
            </p>
            <a 
              href="https://link.mercadopago.com.mx/luchandoporangeles" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnMp}`}
            >
              Donar con Mercado Pago <ExternalLink size={16} />
            </a>
          </div>

          {/* Card 2: PayPal */}
          <div className={`${styles.card} ${styles.paypalCard}`}>
            <div className={`${styles.iconWrap} ${styles.paypalIcon}`}>
              <Heart size={36} />
            </div>
            <h2 className={styles.cardTitle}>Donación Internacional</h2>
            <p className={styles.cardDesc}>
              Seguro y confiable a nivel mundial. Ideal para donaciones recurrentes mensuales o aportaciones 
              internacionales con cualquier tarjeta de crédito o saldo de cuenta PayPal.
            </p>
            <a 
              href="https://www.paypal.com/donate/?hosted_button_id=ZXY46C6VLR3CU" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnPaypal}`}
            >
              Donar con PayPal <ExternalLink size={16} />
            </a>
          </div>

        </section>

        {/* ── Interactive Impact Widget ── */}
        <section className={styles.widgetSection}>
          <div className={styles.widgetHeader}>
            <h2 className={styles.widgetTitle}>El impacto de tu aportación</h2>
            <p className={styles.widgetDesc}>Selecciona un monto para ver cómo se transforma en ayuda real:</p>
          </div>

          <div className={styles.amountsGrid}>
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`${styles.amountBtn} ${activeIdx === idx ? styles.amountBtnActive : ''}`}
                aria-label={`Sugerir donación de ${item.amount} pesos`}
              >
                <div className={styles.amountVal}>${item.amount} MXN</div>
                <div className={styles.amountLabel}>{item.label}</div>
              </button>
            ))}
          </div>

          <div className={styles.impactBox}>
            <div className={styles.impactIcon}>
              <Heart size={24} fill="currentColor" />
            </div>
            <div className={styles.impactText}>
              {SUGGESTIONS[activeIdx].text}
            </div>
          </div>
        </section>

        {/* ── SPEI Bank Transfer Section ── */}
        <section className={styles.speiSection}>
          <div className={styles.speiLeft}>
            <h2 className={styles.speiTitle}>Transferencia Interbancaria (SPEI)</h2>
            <p className={styles.speiDesc}>
              Si deseas realizar un depósito directo desde tu banca móvil, te compartimos nuestra información bancaria oficial. 
              Como donataria autorizada ante el SAT, emitimos recibos 100% deducibles de impuestos.
            </p>
            <div className={styles.speiBadge}>
              <ShieldCheck size={18} /> Donataria Autorizada SAT
            </div>
          </div>

          <div className={styles.speiTable}>
            {bankDetails.map((detail, idx) => (
              <div key={idx} className={styles.speiRow}>
                <div>
                  <div className={styles.speiLabel}>{detail.label}</div>
                  <div className={styles.speiVal}>{detail.val}</div>
                </div>
                <button
                  onClick={() => handleCopy(detail.val, detail.label)}
                  className={`${styles.copyBtn} ${copiedField === detail.label ? styles.copiedText : ''}`}
                  aria-label={`Copiar ${detail.label}`}
                >
                  {copiedField === detail.label ? (
                    <>
                      <Check size={13} /> ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copiar
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust Block ── */}
        <section className={styles.trustBlock} style={{ marginBottom: pageData?.layout?.length ? 0 : 0 }}>
          <Award size={36} color="var(--primary)" style={{ marginBottom: 16 }} />
          <h3 className={styles.trustTitle}>Certificación Óptima de Transparencia CEMEFI</h3>
          <p className={styles.trustText}>
            Lucha Por Ángeles Pequeños A.C. cumple con la totalidad de los indicadores de institucionalidad y transparencia del CEMEFI. 
            Para solicitar tu recibo deducible de impuestos, por favor envía tu comprobante de donación junto con tu cédula fiscal (CSF) 
            al correo <strong style={{ color: 'var(--text)' }}>contacto@lpap.com.mx</strong>. ¡Gracias por transformar vidas!
          </p>
        </section>

        {/* ── Other CMS blocks (non-hero) below static content ── */}
        {otherBlocks.length > 0 && (
          <div style={{ marginTop: 80, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 80 }}>
            <Blocks layout={otherBlocks} products={products} />
          </div>
        )}

      </div>
    </main>
  )
}
