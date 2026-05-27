import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderName',
    defaultColumns: ['orderName', 'total', 'status', 'createdAt'],
    group: 'Ecommerce',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.customer?.name) {
          data.orderName = data.customer.name
        }
        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (('role' in user && user.role === 'admin') || user.collection === 'users') return true // Admins
      return {
        account: { equals: user.id },
      }
    },
    create: () => true,
    update: ({ req: { user } }) => (user && 'role' in user && user.role === 'admin') || user?.collection === 'users',
    delete: ({ req: { user } }) => (user && 'role' in user && user.role === 'admin') || user?.collection === 'users',
  },
  fields: [
    {
      name: 'orderName',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'customers',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'customer',
      type: 'group',
      label: 'Información del Cliente',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Productos (Snapshot)',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Nombre al momento de compra',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
        },
        {
          name: 'imageUrl',
          type: 'text',
        },
        {
          name: 'variantName',
          type: 'text',
          label: 'Variante seleccionada',
        },
        {
          name: 'price',
          type: 'number',
          label: 'Precio unitario',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          admin: { width: '25%' },
        },
        {
          name: 'shipping',
          type: 'number',
          required: true,
          defaultValue: 180,
          admin: { width: '25%' },
        },
        {
          name: 'taxes',
          type: 'number',
          required: true,
          admin: { width: '25%' },
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Pagado', value: 'paid' },
        { label: 'En proceso', value: 'processing' },
        { label: 'Enviado', value: 'shipped' },
        { label: 'Entregado', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Dirección de Envío',
      fields: [
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true, defaultValue: 'México' },
        {
          name: 'specifications',
          type: 'textarea',
          label: 'Especificaciones / Referencias',
          admin: {
            placeholder: 'Ej. Casa blanca con portón negro',
          },
        },
      ],
    },
    {
      name: 'stripe',
      type: 'group',
      label: 'Información de Pago (Stripe)',
      admin: {
        description: 'Datos generados automáticamente al procesar el pago con Stripe.',
      },
      fields: [
        { name: 'sessionId', type: 'text', label: 'Session ID', admin: { readOnly: true } },
        { name: 'paymentIntentId', type: 'text', label: 'Payment Intent ID', admin: { readOnly: true } },
        { name: 'paymentStatus', type: 'text', label: 'Estado del Pago', admin: { readOnly: true } },
      ],
    },
  ],
}
