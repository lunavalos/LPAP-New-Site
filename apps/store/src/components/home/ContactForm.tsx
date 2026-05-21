'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: 'Hacer una Donación',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate sending message
    setTimeout(() => {
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestedIn: 'Hacer una Donación',
        message: ''
      })
    }, 1500)
  }

  return (
    <section className={styles.section} id="contacto">
      <div className="container">
        <div className={styles.grid}>
          
          {/* Left Column: Contact Info */}
          <div className={styles.infoCol}>
            <span className={styles.tag}>Contacto</span>
            <h2 className={styles.title}>
              ¡Gracias por ser <br />
              <span className={styles.accentText}>nuestro ángel!</span>
            </h2>
            <p className={styles.subtitle}>
              Durante nuestra lucha el amor y la pasión a esta causa han movido miles de corazones. Si deseas colaborar o necesitas más información, no dudes en escribirnos.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <h4>Teléfono</h4>
                  <a href="tel:844-228-1480">(844) 228-1480</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <h4>Correo Electrónico</h4>
                  <a href="mailto:contacto@lpap.com.mx">contacto@lpap.com.mx</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <h4>Oficina (Previa Cita)</h4>
                  <p>Casa Cumbres</p>
                  <a 
                    href="https://goo.gl/maps/u2v4RmAwsGXHrp3F9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    Eulalio Gutierrez #144 Int. 6B Plaza Quinta Real, Saltillo, Coahuila
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={64} className={styles.successIcon} />
                  <h3>¡Mensaje Enviado!</h3>
                  <p>Gracias por contactarnos. Nuestro equipo se comunicará contigo lo antes posible para darle seguimiento a tu mensaje.</p>
                  <button onClick={() => setStatus('idle')} className={styles.btnReset}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="name">Nombre Completo</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Nombre" 
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="phone">Teléfono</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="Teléfono" 
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="interestedIn">Estoy interesado(a) en</label>
                      <select 
                        id="interestedIn"
                        name="interestedIn" 
                        value={formData.interestedIn} 
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="Hacer una Donación">Hacer una Donación</option>
                        <option value="Solicitar Apoyo">Solicitar Apoyo</option>
                        <option value="Voluntariado">Voluntariado / Alianzas</option>
                        <option value="Otra consulta">Otra consulta</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="message">Mensaje</label>
                      <textarea 
                        id="message"
                        name="message" 
                        required 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="Escribe aquí tu mensaje..." 
                        rows={4}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn} 
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      'Enviando...'
                    ) : (
                      <>
                        Enviar Mensaje <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
