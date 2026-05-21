import React from 'react'
import DonarClient from '@/components/DonarClient'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export const metadata = {
  title: 'Donar Ahora · LPAP A.C.',
  description: 'Tu generosidad cambia una vida. Apoya a niños con cáncer y sus familias a través de aportaciones seguras con PayPal, Mercado Pago o transferencia SPEI.',
}

export default async function DonarPage() {
  let pageData = null
  let products: any[] = []

  try {
    const [pageRes, productsRes] = await Promise.all([
      fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=donar&depth=2`, { cache: 'no-store' }),
      fetch(`${PAYLOAD_URL}/api/products?limit=12&depth=2`, { cache: 'no-store' }),
    ])

    const pageJson = await pageRes.json()
    const productsJson = await productsRes.json()

    pageData = pageJson.docs?.[0] || null
    products = productsJson.docs || []
  } catch (e) {
    console.error('DonarPage: Error fetching dynamic CMS page/products', e)
  }

  return <DonarClient pageData={pageData} products={products} />
}
