import type { Block } from 'payload'

export const Archive: Block = {
  slug: 'archive',
  labels: {
    singular: 'Carrusel de Productos',
    plural: 'Carruseles de Productos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Colección', value: 'collection' },
        { label: 'Selección Manual', value: 'manual' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'products',
      options: [{ label: 'Productos', value: 'products' }],
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'manualSelection',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'manual',
      },
    },
  ],
}
