import React from 'react'
import Blocks from '@/components/Blocks'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default async function TiendaPage() {
  let layout: any[] = []
  let serverProducts: any[] = []

  try {
    // 1. Fetch page layout
    const pageRes = await fetch(
      `${PAYLOAD_URL}/api/pages?where[slug][equals]=tienda&depth=2`,
      { cache: 'no-store' }
    )
    const pageJson = await pageRes.json()
    layout = pageJson.docs?.[0]?.layout || []

    // 2. Pre-fetch products on the server for the product-grid block
    const gridBlock = layout.find((b: any) => b.blockType === 'product-grid')
    if (gridBlock) {
      const params = new URLSearchParams()
      if (gridBlock.limit) params.append('limit', gridBlock.limit.toString())
      if (gridBlock.sort) params.append('sort', gridBlock.sort)
      if (gridBlock.featuredOnly) params.append('where[featured][equals]', 'true')
      if (gridBlock.categories?.length) {
        gridBlock.categories.forEach((cat: any) => {
          const catId = typeof cat === 'object' ? cat.id : cat
          params.append('where[category][in][]', catId)
        })
      }

      const prodRes = await fetch(
        `${PAYLOAD_URL}/api/products?depth=1&${params.toString()}`,
        { cache: 'no-store' }
      )
      const prodJson = await prodRes.json()
      serverProducts = prodJson.docs || []
    }
  } catch (e) {
    console.error('TiendaPage: Error fetching data', e)
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Blocks layout={layout} serverProducts={serverProducts} />
    </main>
  )
}
