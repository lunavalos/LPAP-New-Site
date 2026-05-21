import type { Block } from 'payload'

export const SupportForm: Block = {
  slug: 'supportForm',
  labels: {
    singular: 'Formulario de Apoyo',
    plural: 'Formularios de Apoyo',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título de la Sección',
      defaultValue: 'Formulario de Solicitud de Apoyo',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción o Instrucciones',
      defaultValue: 'Por favor complete todos los datos del paciente y del tutor para iniciar el proceso de evaluación de su caso.',
    },
  ],
}
