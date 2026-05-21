# Diccionario de Datos (Modelos)

## Colecciones

### Products
- `title`: String (Obligatorio)
- `slug`: String (Único, Sidebar)
- `category`: Relationship (Categorías)
- `variants`: Array
  - `name`: String
  - `sku`: String
  - `price`: Number
  - `stock`: Number
- `meta`: SEO Group

### Orders
- `user`: Relationship (Users)
- `items`: Array (Snapshots)
- `total`: Number
- `status`: Select (pending, paid, shipped, cancelled)

### Pages
- `layout`: Blocks (Hero, Content, Archive)
- `slug`: String (Navegación dinámica)

## Globales

### SiteSettings
- Logo, Título, Contacto, Social Links.
