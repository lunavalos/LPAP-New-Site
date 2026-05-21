import { withPayload } from '@payloadcms/next/withPayload'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['payload'],
}

export default withPayload(nextConfig)
