import { getPayload } from 'payload'
import config from '../payload.config'

const fixSlugs = async () => {
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    limit: 1000,
  })

  console.log(`Found ${products.docs.length} products to check.`)

  for (const product of products.docs) {
    if (!product.slug) {
      const newSlug = product.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
      console.log(`Updating product "${product.title}" with slug "${newSlug}"`)
      await payload.update({
        collection: 'products',
        id: product.id,
        data: {
          slug: newSlug,
        },
      })
    }
  }

  console.log('Finished updating slugs.')
  process.exit(0)
}

fixSlugs()
