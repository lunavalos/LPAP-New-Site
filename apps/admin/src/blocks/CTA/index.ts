import type { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'Llamada a la Acción (CTA)',
    plural: 'Llamadas a la Acción (CTAs)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
