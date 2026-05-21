'use client'

import React from 'react'
import { Award, ShieldCheck } from 'lucide-react'
import styles from './Mission.module.css'

export default function Mission() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          {/* ── Left: Image with decorative elements ── */}
          <div className={styles.imageWrap}>
            <div className={styles.imageInner}>
              <img
                src="/img/ludotecas-6.jpg"
                alt="Niños en ludoteca LPAP"
                className={styles.image}
              />
            </div>
            <div className={styles.imageAccent} />
          </div>

          {/* ── Right: Story & Credentials ── */}
          <div className={styles.content}>
            <span className={styles.tag}>Nuestra Historia</span>

            <h2 className={styles.title}>
              Fundada con amor,{' '}
              <span className={styles.accent}>sostenida por esperanza</span>
            </h2>

            <p className={styles.text}>
              LPAP A.C. nació en 2015 cuando Nayeli Pereznegrón y Luis Aguilar perdieron a su
              hijo Luis Pablo, quien luchó valientemente contra la leucemia mieloide aguda.
              Su dolor se convirtió en propósito: que ningún niño con cáncer ni su familia
              enfrenten solos este camino.
            </p>

            <div className={styles.credBadges}>
              <div className={styles.credItem}>
                <Award size={28} className={styles.credIcon} />
                <div>
                  <h4 className={styles.credTitle}>Certificación de Transparencia (CEMEFI)</h4>
                  <p className={styles.credDescription}>
                    Acreditación del nivel más alto del Centro Mexicano para la Filantropía, garantizando un uso claro y eficiente de los recursos.
                  </p>
                </div>
              </div>
              <div className={styles.credItem}>
                <ShieldCheck size={28} className={styles.credIcon} />
                <div>
                  <h4 className={styles.credTitle}>Donataria Autorizada (SAT)</h4>
                  <p className={styles.credDescription}>
                    Autorización oficial para emitir comprobantes deducibles de impuestos (CFDI) en todas tus aportaciones y donaciones.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
