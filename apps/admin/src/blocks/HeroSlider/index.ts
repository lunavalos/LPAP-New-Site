import type { Block } from 'payload'

export const HeroSlider: Block = {
  slug: 'hero-slider',
  labels: {
    singular: 'Hero Slider',
    plural: 'Hero Sliders',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'backgroundImages',
      type: 'array',
      label: 'Imágenes de Fondo (Slideshow)',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Botones de Acción',
      minRows: 1,
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
