# API Reference (Headless Consumption)

Payload CMS expone automáticamente endpoints REST y GraphQL.

## Endpoints Principales (REST)

- `GET /api/products`: Lista de productos con filtros y paginación.
- `GET /api/products/:slug`: Detalle de producto por slug.
- `GET /api/categories`: Categorías disponibles.
- `GET /api/globals/site-settings`: Configuración global del sitio.
- `GET /api/globals/navigation`: Estructura de menús.

## Autenticación para Frontends

Los frontends deben autenticarse mediante:
- **JWT**: Para el portal del cliente (`/apps/app`).
- **API Keys**: (Opcional) para servicios externos o SSR si es necesario.

## GraphQL

El endpoint de GraphQL está disponible en `/api/graphql` y permite consultas optimizadas para el frontend de Next.js, reduciendo el over-fetching.
