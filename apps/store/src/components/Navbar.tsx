import React from 'react'
import { getGlobal } from '@/lib/payload'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  let navData = { navItems: [] }
  let siteSettings = null
  
  try {
    [navData, siteSettings] = await Promise.all([
      getGlobal('header'),
      getGlobal('site-settings')
    ])
  } catch (e) {
    console.error('Navbar: Error fetching data', e)
  }

  return <NavbarClient navItems={navData?.navItems || []} siteSettings={siteSettings} />
}
