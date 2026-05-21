import type { Block } from 'payload'

export const ImageSection: Block = {
  slug: 'imageSection',
  labels: {
    singular: 'Sección de Imagen',
    plural: 'Secciones de Imagen',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'fullWidth',
      options: [
        { label: 'Ancho Completo', value: 'fullWidth' },
        { label: 'Contenedor', value: 'container' },
      ],
    },
  ],
}
