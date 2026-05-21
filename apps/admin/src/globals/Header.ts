import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navegación Superior',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', required: true },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'reference',
              options: [
                { label: 'Referencia Interna', value: 'reference' },
                { label: 'URL Externa', value: 'custom' },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.type === 'custom',
              },
            },
          ],
        },
      ],
    },
  ],
}
