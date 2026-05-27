'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import styles from './SupportForm.module.css'

interface SupportFormProps {
  title?: string
  description?: string
}

export default function SupportForm({ title, description }: SupportFormProps) {
  const [formData, setFormData] = useState({
    pacienteNombre: '',
    pacienteEdad: '',
    pacienteDiagnostico: '',
    pacienteHospital: '',
    pacienteMedico: '',
    tutorNombre: '',
    tutorRelacion: 'Madre',
    tutorTelefono: '',
    tutorEmail: '',
    descripcionCaso: '',
  })

  const [apoyos, setApoyos] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (value: string) => {
    setApoyos(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate submission to server (e.g. 1.5s delay)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)
  }

  const supportOptions = [
    'Medicamentos Oncológicos',
    'Sesiones de Quimioterapia',
    'Estudios de Laboratorio',
    'Traslados / Viáticos',
    'Suplementos Alimenticios',
    'Otro apoyo',
  ]

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.card} ${styles.successCard}`}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={48} />
            </div>
            <h3 className={styles.successTitle}>¡Solicitud Recibida!</h3>
            <p className={styles.successMessage}>
              Hemos recibido los datos de <strong>{formData.pacienteNombre}</strong>. Un trabajador social de la fundación se pondrá en contacto contigo al teléfono <strong>{formData.tutorTelefono}</strong> o al correo <strong>{formData.tutorEmail}</strong> en un lapso no mayor a 24-48 horas hábiles para indicarte los siguientes pasos del proceso de evaluación socioeconómica.
            </p>
            <p style={{ fontSize: 13, color: '#888', marginTop: 10 }}>
              Código de solicitud temporal: <strong>LPAP-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>{title || 'Formulario de Solicitud de Apoyo'}</h2>
          <p className={styles.description}>
            {description || 'Por favor complete todos los datos del paciente y del tutor para iniciar el proceso de evaluación de su caso.'}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* 1. Datos del Paciente */}
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Datos del Paciente (Menor de edad)</legend>
              
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="pacienteNombre" className={styles.label}>Nombre completo del menor *</label>
                  <input
                    type="text"
                    id="pacienteNombre"
                    name="pacienteNombre"
                    required
                    value={formData.pacienteNombre}
                    onChange={handleInputChange}
                    placeholder="Nombre completo"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="pacienteEdad" className={styles.label}>Edad *</label>
                  <input
                    type="number"
                    id="pacienteEdad"
                    name="pacienteEdad"
                    required
                    min="0"
                    max="18"
                    value={formData.pacienteEdad}
                    onChange={handleInputChange}
                    placeholder="De 0 a 18 años"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="pacienteDiagnostico" className={styles.label}>Diagnóstico / Tipo de cáncer *</label>
                  <input
                    type="text"
                    id="pacienteDiagnostico"
                    name="pacienteDiagnostico"
                    required
                    value={formData.pacienteDiagnostico}
                    onChange={handleInputChange}
                    placeholder="Ej. Leucemia Linfoblástica Aguda"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="pacienteHospital" className={styles.label}>Hospital de tratamiento *</label>
                  <input
                    type="text"
                    id="pacienteHospital"
                    name="pacienteHospital"
                    required
                    value={formData.pacienteHospital}
                    onChange={handleInputChange}
                    placeholder="Hospital donde es atendido"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup} style={{ maxWidth: '50%' }}>
                <label htmlFor="pacienteMedico" className={styles.label}>Nombre del Médico Tratante</label>
                <input
                  type="text"
                  id="pacienteMedico"
                  name="pacienteMedico"
                  value={formData.pacienteMedico}
                  onChange={handleInputChange}
                  placeholder="Oncólogo pediatra tratante"
                  className={styles.input}
                />
              </div>
            </fieldset>

            {/* 2. Datos del Tutor */}
            <fieldset className={styles.fieldset} style={{ marginTop: 10 }}>
              <legend className={styles.legend}>Datos del Tutor (Contacto Principal)</legend>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="tutorNombre" className={styles.label}>Nombre completo del tutor *</label>
                  <input
                    type="text"
                    id="tutorNombre"
                    name="tutorNombre"
                    required
                    value={formData.tutorNombre}
                    onChange={handleInputChange}
                    placeholder="Padre, madre o tutor legal"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tutorRelacion" className={styles.label}>Parentesco / Relación *</label>
                  <select
                    id="tutorRelacion"
                    name="tutorRelacion"
                    value={formData.tutorRelacion}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Tutor Legal">Tutor Legal</option>
                    <option value="Otro">Otro familiar</option>
                  </select>
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="tutorTelefono" className={styles.label}>Teléfono de contacto (WhatsApp) *</label>
                  <input
                    type="tel"
                    id="tutorTelefono"
                    name="tutorTelefono"
                    required
                    value={formData.tutorTelefono}
                    onChange={handleInputChange}
                    placeholder="10 dígitos con clave lada"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tutorEmail" className={styles.label}>Correo electrónico *</label>
                  <input
                    type="email"
                    id="tutorEmail"
                    name="tutorEmail"
                    required
                    value={formData.tutorEmail}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    className={styles.input}
                  />
                </div>
              </div>
            </fieldset>

            {/* 3. Tipo de Apoyo y Detalles */}
            <fieldset className={styles.fieldset} style={{ marginTop: 10 }}>
              <legend className={styles.legend}>Detalles de la Solicitud</legend>

              <div className={styles.formGroup}>
                <label className={styles.label}>Seleccione los apoyos específicos que requiere:</label>
                <div className={styles.checkboxContainer}>
                  {supportOptions.map((opt, idx) => {
                    const isChecked = apoyos.includes(opt)
                    return (
                      <label
                        key={idx}
                        className={`${styles.checkboxLabel} ${isChecked ? styles.checkboxLabelChecked : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(opt)}
                          className={styles.checkboxInput}
                        />
                        <span>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="descripcionCaso" className={styles.label}>Descripción de la solicitud o necesidades *</label>
                <textarea
                  id="descripcionCaso"
                  name="descripcionCaso"
                  required
                  rows={4}
                  value={formData.descripcionCaso}
                  onChange={handleInputChange}
                  placeholder="Por favor describa brevemente las necesidades o medicamentos específicos que requiere el paciente en este momento..."
                  className={styles.textarea}
                />
              </div>
            </fieldset>

            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Procesando solicitud...
                </>
              ) : (
                <>
                  <Send size={18} /> Enviar Solicitud de Apoyo
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
