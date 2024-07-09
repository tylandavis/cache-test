import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
const payload = await getPayloadHMR({ config: configPromise })

export async function generateStaticParams() {
  const data = await payload.find({
    collection: 'pages',
  })

  const pages = await data.docs

  return pages
    .map((page) =>
      page.slug
        ? {
            slug: page.slug,
          }
        : null,
    )
    .filter(Boolean)
}

export default async function Page({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const currentTimestamp = new Date().toLocaleTimeString()

  const data = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  const page = await data.docs[0]

  return (
    <div>
      <h1>{page.title}</h1>
      <p>Current time: {currentTimestamp}</p>
    </div>
  )
}
