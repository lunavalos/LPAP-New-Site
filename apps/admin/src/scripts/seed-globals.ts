import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

process.env.MONGODB_URI = 'mongodb://localhost:27017/lpap'
process.env.PAYLOAD_SECRET = '69c5e7b1a2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9'

const seedGlobals = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding site-settings and header globals...')

  // 1. Upload lpap-logo.png to Media
  const logoPath = path.join(dirname, '../../../store/public/lpap-logo.png')
  let logoId = ''

  if (fs.existsSync(logoPath)) {
    const fileBuffer = fs.readFileSync(logoPath)
    
    // Check if it already exists in media
    const existingLogo = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'lpap-logo.png'
        }
      }
    })

    if (existingLogo.docs.length > 0) {
      logoId = existingLogo.docs[0].id
      console.log(`Logo already exists in media (ID: ${logoId})`)
    } else {
      const newMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'LPAP Logo',
        },
        file: {
          name: 'lpap-logo.png',
          contentType: 'image/png',
          data: fileBuffer,
          size: fileBuffer.length,
        },
      })
      logoId = newMedia.id
      console.log(`Uploaded logo to media (ID: ${logoId})`)
    }
  } else {
    console.error(`Error: Logo file not found at ${logoPath}`)
    process.exit(1)
  }

  // 2. Update site-settings global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteTitle: 'Lucha Por Ángeles Pequeños',
      logo: logoId,
      contact: {
        email: 'contacto@lpap.com.mx',
        phone: '(844) 228-1480',
        address: 'Saltillo, Coahuila',
      },
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/lpap' },
        { platform: 'instagram', url: 'https://instagram.com/lpap' },
        { platform: 'whatsapp', url: 'https://wa.me/528442281480' },
      ],
    },
  })
  console.log('Updated site-settings global!')

  // 3. Find pages to link to in header
  const tiendaPages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'tienda'
      }
    }
  })

  const navItems: any[] = []

  // Add Nosotros link
  navItems.push({
    link: {
      label: 'Nosotros',
      type: 'custom',
      url: '/nosotros',
    }
  })

  // Add Programas link
  navItems.push({
    link: {
      label: 'Programas',
      type: 'custom',
      url: '/programas',
    }
  })

  if (tiendaPages.docs.length > 0) {
    navItems.push({
      link: {
        label: 'Tienda con Causa',
        type: 'reference',
        reference: tiendaPages.docs[0].id,
      }
    })
  }

  // Add Donar link
  navItems.push({
    link: {
      label: 'Donar',
      type: 'custom',
      url: '/donar',
    }
  })

  // Update header global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems,
    },
  })
  console.log('Updated header global!')

  // Update store-settings global
  await payload.updateGlobal({
    slug: 'store-settings',
    data: {
      shippingPrice: 180,
    },
  })
  console.log('Updated store-settings global!')

  console.log('✅ Globals seeded successfully!')
  process.exit(0)
}

seedGlobals().catch((err) => {
  console.error('❌ Error seeding globals:', err)
  process.exit(1)
})
