import React from 'react'
import { notFound } from 'next/navigation'
import ProductClient from './ProductClient'

const PAYLOAD_URL = process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const res = await fetch(`${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}&depth=2`, { cache: 'no-store' })
    const json = await res.json()
    const product = json.docs?.[0]

    if (!product) return notFound()

    return <ProductClient product={product} />
  } catch (e) {
    console.error('Error fetching product:', e)
    return notFound()
  }
}
