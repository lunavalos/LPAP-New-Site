import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'createdAt'],
    group: 'Ecommerce',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (('role' in user && user.role === 'admin') || user.collection === 'users') return true // Admins can read all
      return {
        id: { equals: user.id },
      }
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (('role' in user && user.role === 'admin') || user.collection === 'users') return true // Admins can update all
      return {
        id: { equals: user.id },
      }
    },
    delete: ({ req: { user } }) => {
       if ((user && 'role' in user && user.role === 'admin') || user?.collection === 'users') return true
       return false
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'addresses',
      type: 'array',
      label: 'Mis Direcciones',
      fields: [
        {
          name: 'isDefault',
          type: 'checkbox',
          label: 'Dirección Principal',
          defaultValue: false,
        },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true, defaultValue: 'México' },
        { name: 'specifications', type: 'textarea' },
      ],
    },
  ],
}
