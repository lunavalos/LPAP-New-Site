import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || ''
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Stock Total / Base',
      defaultValue: 0,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Precio Base',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      label: 'Variantes de Producto (Opcional - Color, Talla, etc.)',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre de la Variante (ej: Rojo / Grande)',
          required: true,
        },
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen de la Variante (Opcional)',
          required: false,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'stock',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Producto Destacado',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
