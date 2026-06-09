import React from 'react'
import styles from './Aviso.module.css'

export default function AvisoDerechosReservadosPage() {
  return (
    <main className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Aviso de Derechos Reservados</h1>
          <p className={styles.heroSub}>
            Luchando por Ángeles Pequeños, A.C.
          </p>
        </div>

        <div className={styles.contentCard}>
          <p>
            Quedan reservados todos los derechos, por lo que ninguna parte de esta publicación podrá ser reproducida, almacenada en un sistema de recuperación, transmitida bajo ninguna forma por ningún medio, ya sea electrónico, mecánico, de fotocopiado, grabación o cualquier otro, sin el previo consentimiento por escrito de <strong>Luchando por Ángeles Pequeños A.C.</strong> (aquí referido como <strong>LPAP</strong>). La información contenida en el presente aplica para todos los productos comercializados por LPAP.
          </p>
          <p>
            LPAP no se hace responsable por ningún daño o problemas causados por el uso inadecuado de los diferentes accesorios o productos que no sean aprobados previamente por LPAP.
          </p>
          <p>
            LPAP se reserva todos los derechos relacionados con sus marcas y productos LPAP no concedidos expresamente a un tercero bajo el acuerdo de alguna licencia y ningún otro derecho. Quedan reservados todos los derechos.
          </p>
          <p>
            La información que se incluye en el presente está sujeta a cambios sin previo aviso.
          </p>

          <p style={{ marginTop: '40px', textAlign: 'center', fontStyle: 'italic', color: 'var(--text-light)' }}>
            Agradecemos la confianza que nos brindas y seguimos a tus órdenes.
          </p>
        </div>
      </div>
    </main>
  )
}
