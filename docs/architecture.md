# Arquitectura del Sistema LPAP

El proyecto LPAP es un ecosistema de e-commerce headless basado en un monorepo con las siguientes capas:

## Aplicaciones

- **/apps/admin**: Backend centralizado basado en Payload CMS 3.0.
  - Gestiona la persistencia de datos (MongoDB).
  - Expone APIs REST y GraphQL.
  - Centraliza el sistema de autenticación.
- **/apps/store** (Futuro): Tienda pública para clientes finales (Next.js).
- **/apps/app** (Futuro): Portal privado para clientes (Next.js).

## Flujo de Datos

1. El Admin gestiona contenido, productos y órdenes.
2. Los frontends consumen los datos vía API.
3. Las imágenes son procesadas mediante `sharp` y servidas desde el backend.

## Integraciones Futuras

- **Stripe**: Gestión de pagos y suscripciones.
- **Email**: Notificaciones automáticas de órdenes.
