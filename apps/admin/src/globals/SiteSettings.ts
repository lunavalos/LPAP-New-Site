import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del Sitio',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
