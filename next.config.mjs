import { withPayload } from '@payloadcms/next/withPayload'
import { resolve } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
            // value: 's-maxage=0, stale-while-revalidate, stale-if-error',
          },
        ],
      },
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
            // value: 's-maxage=0, stale-while-revalidate, stale-if-error',
          },
        ],
      },
    ]
  },
  cacheMaxMemorySize: 0, // disable default in-memory caching
}

export default withPayload(nextConfig)
