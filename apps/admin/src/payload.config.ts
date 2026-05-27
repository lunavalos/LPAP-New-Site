import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import { Customers } from './collections/Customers'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { StoreSettings } from './globals/StoreSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  ],
  csrf: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      Nav: './components/Nav/index.tsx',
    },
    meta: {
      titleSuffix: '- LPAP Admin',
    },
    livePreview: {
      url: ({ data }: any) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
        // Fallback robusto para el slug
        const slug = data.slug || (data.title === 'Inicio' ? 'home' : '')
        return `${baseUrl}/${slug === 'home' ? '' : slug}`
      },
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Users,
    Customers,
    Products,
    Categories,
    Orders,
    Pages,
    Media,
  ],
  globals: [
    SiteSettings,
    Header,
    StoreSettings,
  ],
  i18n: {
    fallbackLanguage: 'es',
  },
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev-only',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/lpap',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'products'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `LPAP | ${doc.title || 'Página'}`,
      generateDescription: ({ doc }: any) => doc.subtitle || doc.description || 'LPAP - Lucha Por Ángeles Pequeños',
      generateURL: ({ doc, collectionSlug }: any) => {
        const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
        if (collectionSlug === 'pages') {
          const slug = doc.slug || (doc.title === 'Inicio' ? 'home' : '')
          return `${url}/${slug === 'home' ? '' : slug}`
        }
        if (collectionSlug === 'products') {
          return `${url}/productos/${doc.slug || ''}`
        }
        return url
      },
    }),
  ],
})
