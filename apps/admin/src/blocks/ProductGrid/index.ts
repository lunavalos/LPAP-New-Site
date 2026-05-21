import type { Block } from 'payload'

export const ProductGrid: Block = {
  slug: 'product-grid',
  labels: {
    singular: 'Grilla de Productos Dinámica',
    plural: 'Grillas de Productos Dinámicas',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título de la Sección',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Filtrar por Categorías (opcional)',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      label: 'Límite de productos',
    },
    {
      name: 'sort',
      type: 'select',
      defaultValue: '-createdAt',
      options: [
        { label: 'Más nuevos primero', value: '-createdAt' },
        { label: 'Más antiguos primero', value: 'createdAt' },
        { label: 'Precio: Menor a Mayor', value: 'price' },
        { label: 'Precio: Mayor a Menor', value: '-price' },
        { label: 'Título: A-Z', value: 'title' },
      ],
      label: 'Orden',
    },
    {
      name: 'featuredOnly',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mostrar solo destacados',
    },
  ],
}
