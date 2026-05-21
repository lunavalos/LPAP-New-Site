import type { Block } from 'payload'

export const Spacer: Block = {
  slug: 'spacer',
  labels: {
    singular: 'Espaciador',
    plural: 'Espaciadores',
  },
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Pequeño', value: 'small' },
        { label: 'Mediano', value: 'medium' },
        { label: 'Grande', value: 'large' },
      ],
    },
  ],
}
