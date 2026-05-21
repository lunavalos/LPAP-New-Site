import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'subtitle',
      label: 'Subtítulo (Etiqueta sobre el título)',
      type: 'text',
      admin: {
        description: 'Texto pequeño que aparece arriba del título, ej: "Nuestros Programas"',
      },
    },
    {
      name: 'title',
      label: 'Título Principal',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      label: 'Texto / Descripción',
      type: 'textarea',
      admin: {
        description: 'Párrafo descriptivo que aparece debajo del título.',
      },
    },
    {
      // Image is now optional — the hero works with a solid gradient background
      name: 'backgroundImage',
      label: 'Imagen de Fondo (opcional)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Botones de Acción',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
