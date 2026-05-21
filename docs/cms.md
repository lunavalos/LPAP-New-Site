# Documentación del CMS (Payload CMS)

Esta sección detalla la configuración y personalización de Payload CMS para el proyecto LPAP.

## Configuración Base

- **Localización**: `/apps/admin`
- **Motor de DB**: MongoDB
- **Framework**: Next.js (Payload 3.0)

## Organización de Carpetas

Dentro de `src/`:
- `/collections`: Definiciones de modelos de datos (Productos, Usuarios, etc.).
- `/globals`: Configuraciones globales (Logo, Redes Sociales, Menús).
- `/blocks`: Componentes dinámicos para el Layout Builder.
- `/hooks`: Lógica de negocio reutilizable (ej: enviar emails al crear órdenes).
- `/access`: Reglas de control de acceso basadas en roles.

## Autenticación

El CMS gestiona la autenticación de:
1. Administradores (acceso al panel).
2. Clientes (acceso vía API para el portal del cliente).

## Prácticas Recomendadas

- **SEO First**: Todas las colecciones públicas deben incluir el grupo de campos SEO.
- **Snapshots**: Las órdenes deben guardar una copia (snapshot) de los datos del producto en el momento de la compra, no solo una referencia.
- **Imágenes**: Uso de colecciones de Media con tamaños optimizados.
