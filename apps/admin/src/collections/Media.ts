import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
