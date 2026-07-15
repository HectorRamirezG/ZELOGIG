# Entorno de desarrollo

## Objetivo

Un ciclo corto: editar, guardar, ver en localhost, ejecutar una prueba concreta y registrar el resultado.

## Base

- Windows.
- Visual Studio Code.
- Git.
- Node.js LTS.
- NPM incluido con Node.js.
- Navegador Chromium y, cuando sea posible, Firefox.

## Comandos objetivo

```powershell
npm run dev
npm run typecheck
npm run lint
npm run test
npm run test:watch
npm run test:e2e
npm run build
```

## Entornos

- **Local:** motor y cinco niveles sin servicios externos.
- **Preview:** despliegue temporal para probar interfaz y móvil.
- **Producción:** versión aprobada y estable.

## Laboratorio

`src/app/lab/` servirá para probar tablero, reglas, animaciones, tacto y accesibilidad. No es una ruta pública de producción y no se convierte en una segunda arquitectura.

## Condiciones para conectar Supabase

1. El nivel local funciona.
2. Las pruebas del motor pasan.
3. Existe una necesidad de identidad o sincronización.
4. El modelo de datos está aprobado.
5. Las variables de entorno están documentadas y los secretos no llegan al cliente.
