import type { GlobalConfig } from 'payload'

export const StoreSettings: GlobalConfig = {
  slug: 'store-settings',
  label: 'Configuración de Tienda',
  admin: {
    group: 'Ecommerce',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'shippingPrice',
      type: 'number',
      label: 'Costo de Envío Fijo ($)',
      defaultValue: 180,
      required: true,
      admin: {
        description: 'Costo de envío fijo aplicable a todos los pedidos de la tienda.',
      },
    },
  ],
}
