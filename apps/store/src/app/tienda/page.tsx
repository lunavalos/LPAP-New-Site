import React from 'react'
import Blocks from '@/components/Blocks'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default async function TiendaPage() {
  let layout: any[] = []
  
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=tienda&depth=2`, { cache: 'no-store' })
    const json = await res.json()
    layout = json.docs?.[0]?.layout || []
  } catch (e) {
    console.error('TiendaPage: Error fetching layout', e)
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Blocks layout={layout} />
    </main>
  )
}
