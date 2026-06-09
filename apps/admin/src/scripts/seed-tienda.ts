import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

process.env.MONGODB_URI = 'mongodb://localhost:27017/lpap'
process.env.PAYLOAD_SECRET = '69c5e7b1a2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9'

const seed = async () => {
  const payload = await getPayload({ config })

  // 1. Load JSON files and strip BOM if present
  let productsRaw = fs.readFileSync(path.join(dirname, '../../../../products_api.json'), 'utf-8').replace(/^\uFEFF/, '')
  productsRaw = Buffer.from(productsRaw, 'latin1').toString('utf8')
  const productsData = JSON.parse(productsRaw)

  let tiendaRaw = fs.readFileSync(path.join(dirname, '../../../../tienda_api.json'), 'utf-8').replace(/^\uFEFF/, '')
  tiendaRaw = Buffer.from(tiendaRaw, 'latin1').toString('utf8')
  const tiendaData = JSON.parse(tiendaRaw)

  // 2. Clear existing collections to start clean
  console.log('Clearing existing products...')
  const existingProducts = await payload.find({ collection: 'products', limit: 100 })
  for (const doc of existingProducts.docs) {
    await payload.delete({ collection: 'products', id: doc.id })
  }

  console.log('Clearing existing categories...')
  const existingCategories = await payload.find({ collection: 'categories', limit: 100 })
  for (const doc of existingCategories.docs) {
    await payload.delete({ collection: 'categories', id: doc.id })
  }

  console.log('Clearing existing pages with slug "tienda"...')
  const existingPages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tienda' } },
  })
  for (const doc of existingPages.docs) {
    await payload.delete({ collection: 'pages', id: doc.id })
  }

  console.log('Clearing existing media...')
  const existingMedia = await payload.find({ collection: 'media', limit: 100 })
  for (const doc of existingMedia.docs) {
    await payload.delete({ collection: 'media', id: doc.id })
  }

  // Maps to track IDs
  const categoryMap: { [oldId: string]: string } = {}
  const mediaMap: { [filename: string]: string } = {}

  // 3. Process Products & Categories
  console.log('Importing categories and products...')
  for (const item of productsData.docs) {
    // Process Category
    let categoryId = ''
    if (item.category) {
      const oldCatId = item.category.id
      if (categoryMap[oldCatId]) {
        categoryId = categoryMap[oldCatId]
      } else {
        const catSlug = item.category.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        // Create category
        const newCat = await payload.create({
          collection: 'categories',
          data: {
            title: item.category.title,
            slug: catSlug,
          },
        })
        categoryMap[oldCatId] = newCat.id
        categoryId = newCat.id
        console.log(`Created Category: ${item.category.title} (ID: ${newCat.id})`)
      }
    }

    // Process Images
    const newImages = []
    if (item.images && item.images.length > 0) {
      for (const imgWrapper of item.images) {
        const img = imgWrapper.image
        if (img && img.filename) {
          let mediaId = ''
          if (mediaMap[img.filename]) {
            mediaId = mediaMap[img.filename]
          } else {
            const mediaFilePath = path.join(dirname, '../../media', img.filename)
            if (fs.existsSync(mediaFilePath)) {
              const fileBuffer = fs.readFileSync(mediaFilePath)
              const newMedia = await payload.create({
                collection: 'media',
                data: {
                  alt: img.alt || img.filename,
                },
                file: {
                  name: img.filename,
                  contentType: img.mimeType || 'image/png',
                  data: fileBuffer,
                  size: fileBuffer.length,
                },
              })
              mediaMap[img.filename] = newMedia.id
              mediaId = newMedia.id
              console.log(`Uploaded Media: ${img.filename} (ID: ${newMedia.id})`)
            } else {
              console.warn(`Warning: Media file not found: ${mediaFilePath}`)
            }
          }

          if (mediaId) {
            newImages.push({ image: mediaId })
          }
        }
      }
    }

    // Create Product
    const productSlug = item.slug || item.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    const productData = {
      title: item.title,
      slug: productSlug,
      description: item.description || '',
      stock: item.stock || 0,
      price: item.price || 0,
      category: categoryId,
      images: newImages,
      featured: item.featured || false,
      variants: item.variants || [],
    }

    const newProduct = await payload.create({
      collection: 'products',
      data: productData,
    })
    console.log(`Created Product: ${newProduct.title} (ID: ${newProduct.id})`)
  }

  // 4. Process Tienda Page
  console.log('Importing "Tienda con causa" page...')
  for (const pageItem of tiendaData.docs) {
    const newPage = await payload.create({
      collection: 'pages',
      data: {
        title: pageItem.title,
        slug: pageItem.slug,
        layout: pageItem.layout || [],
        meta: pageItem.meta || {},
      },
    })
    console.log(`Created Page: ${newPage.title} (ID: ${newPage.id})`)
  }

  console.log('✅ Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error during seeding:', err)
  process.exit(1)
})
