# Estructura del proyecto

```text
ZelogiG/
|-- docs/                 Direccion, decisiones, riesgos y RFC
|-- public/               Recursos publicos futuros
|-- scripts/              Automatizacion local controlada
|-- src/
|   |-- app/              Rutas y composicion de Next.js
|   |-- components/       Componentes visuales reutilizables
|   |-- features/         Modulos del producto
|   |-- lib/
|   |   |-- engine/       Dominio puro del motor
|   |   `-- supabase/     Adaptadores de infraestructura
|   |-- styles/           Estilos globales y tokens
|   `-- types/            Tipos compartidos estrictamente necesarios
|-- supabase/
|   |-- migrations/       Cambios versionados de datos
|   `-- seed/             Datos iniciales controlados
`-- tests/
    |-- unit/             Reglas puras
    |-- integration/      Modulos conectados
    `-- e2e/              Recorridos criticos
```

## Regla

Cada modulo debe poder entenderse sin recorrer todo el repositorio.
