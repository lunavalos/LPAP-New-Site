import { getPayload } from 'payload'
import config from '../payload.config'

const listPages = async () => {
  try {
    const payload = await getPayload({ config })

    const pages = await payload.find({
      collection: 'pages',
      limit: 100,
    })

    console.log(`Found ${pages.docs.length} pages:`)
    for (const page of pages.docs) {
      console.log(`- ID: ${page.id}, Title: "${page.title}", Slug: "${page.slug}", Layout Blocks: ${page.layout?.map((b: any) => b.blockType).join(', ') || 'none'}`)
    }
  } catch (error) {
    console.error('Error listing pages:', error)
  }
  process.exit(0)
}

listPages()
