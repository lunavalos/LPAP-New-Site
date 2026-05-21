'use client'

import React from 'react'
import Blocks from '@/components/Blocks'

interface PageClientProps {
  initialData: any
  products?: any[]
}

export default function PageClient({ initialData, products = [] }: PageClientProps) {
  const layout = initialData?.layout || []
  return <Blocks layout={layout} products={products} />
}
