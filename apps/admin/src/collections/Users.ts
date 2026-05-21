import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user && 'role' in user && user.role === 'admin') return true
      return {
        id: { equals: user?.id },
      }
    },
    create: ({ req: { user } }) => Boolean(user && 'role' in user && user.role === 'admin'),
    update: ({ req: { user } }) => Boolean(user && 'role' in user && user.role === 'admin'),
    delete: ({ req: { user } }) => Boolean(user && 'role' in user && user.role === 'admin'),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'admin',
      required: true,
      saveToJWT: true,
    },
  ],
}
