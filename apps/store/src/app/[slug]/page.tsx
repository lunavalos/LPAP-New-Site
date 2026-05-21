import React from 'react'
import { notFound, redirect } from 'next/navigation'
import PageClient from '@/components/PageClient'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  // Redirigir a la home si el slug es 'inicio' o 'home'
  if (slug === 'inicio' || slug === 'home') {
    redirect('/')
  }

  let pageData = null
  let products: any[] = []

  try {
    const [pageRes, productsRes] = await Promise.all([
      fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}&depth=2`, { cache: 'no-store' }),
      fetch(`${PAYLOAD_URL}/api/products?limit=30&depth=2`, { cache: 'no-store' }),
    ])

    const pageJson = await pageRes.json()
    const productsJson = await productsRes.json()

    pageData = pageJson.docs?.[0] || null
    products = productsJson.docs || []
  } catch (e) {
    console.error(`[slug] page fetch error for "${slug}":`, e)
  }

  if (!pageData) return notFound()

  return (
    <main>
      <PageClient initialData={pageData} products={products} />
    </main>
  )
}
