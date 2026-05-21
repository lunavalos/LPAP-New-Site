import React from 'react'
import Hero from '@/components/home/Hero'
import Mission from '@/components/home/Mission'
import Programs from '@/components/home/Programs'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CTA from '@/components/home/CTA'
import Blocks from '@/components/Blocks'
import ContactForm from '@/components/home/ContactForm'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default async function HomePage() {
  let products: any[] = []
  let pageData: any = null

  console.log('[HomePage] Fetching products and dynamic page data from:', PAYLOAD_URL)

  try {
    const [productsRes, pageHomeRes] = await Promise.all([
      fetch(`${PAYLOAD_URL}/api/products?limit=12&depth=2`, { cache: 'no-store' }),
      fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=home&depth=2`, { cache: 'no-store' }),
    ])

    if (productsRes.ok) {
      const productsJson = await productsRes.json()
      products = productsJson.docs || []
      console.log(`[HomePage] Dynamically loaded ${products.length} products from Payload CMS.`)
    }

    if (pageHomeRes.ok) {
      const pageJson = await pageHomeRes.json()
      pageData = pageJson.docs?.[0] || null
    }

    // Fallback if home slug does not exist, try "inicio"
    if (!pageData) {
      const pageInicioRes = await fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=inicio&depth=2`, { cache: 'no-store' })
      if (pageInicioRes.ok) {
        const pageJson = await pageInicioRes.json()
        pageData = pageJson.docs?.[0] || null
      }
    }

    if (pageData) {
      console.log(`[HomePage] Dynamic blocks found: ${pageData.layout?.length || 0} blocks.`)
    }
  } catch (e) {
    console.error('[HomePage] Payload API offline or fetch failed. Rendering fallback catalog.', e)
  }

  return (
    <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* ── 1. Custom Static Editorial Sections ── */}
      <Hero />
      <Mission />
      <Programs />
      <FeaturedProducts products={products} />
      <CTA />

      {/* ── 2. Dynamic Layout Blocks from Payload CMS (Hybrid Integration) ── */}
      {pageData?.layout && pageData.layout.length > 0 && (
        <Blocks layout={pageData.layout} products={products} />
      )}

      {/* ── 3. Contact Form ── */}
      <ContactForm />
    </main>
  )
}

