const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export async function getGlobal(slug: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}?depth=2`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Failed to fetch global: ${slug}`)
  return res.json()
}

export async function getPage(slug: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}&depth=2`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Failed to fetch page: ${slug}`)
  const data = await res.json()
  return data.docs[0] || null
}

export async function getProducts(limit = 10) {
  const res = await fetch(`${PAYLOAD_URL}/api/products?limit=${limit}&depth=2`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getMedia(limit = 10) {
  const res = await fetch(`${PAYLOAD_URL}/api/media?limit=${limit}&depth=0`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch media')
  return res.json()
}

export async function getCategories(limit = 100) {
  const res = await fetch(`${PAYLOAD_URL}/api/categories?limit=${limit}&depth=1`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}