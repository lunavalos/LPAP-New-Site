import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { HeroSlider } from '../blocks/HeroSlider'
import { RichText } from '../blocks/RichText'
import { Archive } from '../blocks/Archive'
import { ProductGrid } from '../blocks/ProductGrid'
import { CTA } from '../blocks/CTA'
import { ImageSection } from '../blocks/ImageSection'
import { Features } from '../blocks/Features'
import { Testimonials } from '../blocks/Testimonials'
import { Spacer } from '../blocks/Spacer'
import { Gallery } from '../blocks/Gallery'
import { FAQ } from '../blocks/FAQ'
import { SupportForm } from '../blocks/SupportForm'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
        const slug = data.slug || (data.title === 'Inicio' ? 'home' : '')
        return `${baseUrl}/${slug === 'home' ? '' : slug}`
      },
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || ''
          },
        ],
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: false,
      blocks: [
        Hero,
        HeroSlider,
        RichText,
        Archive,
        ProductGrid,
        CTA,
        ImageSection,
        Features,
        Testimonials,
        Spacer,
        Gallery,
        FAQ,
        SupportForm,
      ],
    },
  ],
}
