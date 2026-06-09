'use client'

import React from 'react'
import { Briefcase, Heart, Award, Users } from 'lucide-react'
import styles from './ESRSection.module.css'

export default function ESRSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* ── Left Column: Logo / Image ── */}
          <div className={styles.logoWrap}>
            <div className={styles.logoInner}>
              <img
                src="/img/esr-logo.png"
                alt="Empresa Socialmente Responsable Logo"
                className={styles.logoImg}
              />
            </div>
            <div className={styles.imageAccent} />
          </div>

          {/* ── Right Column: Content ── */}
          <div className={styles.content}>
            <span className={styles.tag}>Empresas</span>
            
            <h2 className={styles.title}>
              Implementación de <span className={styles.accent}>Programas para ESR</span>
            </h2>

            <p className={styles.leadText}>
              Hoy en día, ser una empresa socialmente responsable representa una ventaja competitiva y da valor agregado. Las empresas socialmente responsables o ESR, tienen una visión de negocios basada en el respeto por las personas, los valores éticos, la comunidad, el medio ambiente y la sustentabilidad de las generaciones futuras.
            </p>

            {/* Benefits list */}
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <Users size={22} className={styles.benefitIcon} />
                <div>
                  <h4 className={styles.benefitTitle}>Sentido de Pertenencia y Motivación</h4>
                  <p className={styles.benefitDesc}>
                    A las personas nos gusta formar parte de una compañía que impacta positivamente a su comunidad y que representa más que un trabajo.
                  </p>
                </div>
              </div>

              <div className={styles.benefitCard}>
                <Briefcase size={22} className={styles.benefitIcon} />
                <div>
                  <h4 className={styles.benefitTitle}>Mejora del Entorno Laboral</h4>
                  <p className={styles.benefitDesc}>
                    Mejora la productividad laboral, reduce el ausentismo y la rotación, disminuye los niveles de estrés y fortalece los equipos.
                  </p>
                </div>
              </div>

              <div className={styles.benefitCard}>
                <Award size={22} className={styles.benefitIcon} />
                <div>
                  <h4 className={styles.benefitTitle}>Asesoría Completa y sin Costo</h4>
                  <p className={styles.benefitDesc}>
                    Únete a nuestra red. Nosotros te apoyamos a encontrar la mejor opción para tu compañía o negocio sin ningún costo.
                  </p>
                </div>
              </div>
            </div>

            {/* Special Callout */}
            <div className={styles.callout}>
              <Heart size={24} className={styles.calloutIcon} />
              <div className={styles.calloutContent}>
                <p className={styles.calloutText}>
                  Si cuentas con algún colaborador en tu empresa o algún conocido que esté pasando por una situación de cáncer infantil, cuentas con nosotros. <strong>Nos encantará apoyar.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
