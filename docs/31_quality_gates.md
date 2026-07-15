# Puertas de calidad

## Antes de aceptar código

- Arquitectura revisada.
- Decisión aprobada si cambia dependencias, datos o comportamiento central.
- Tipos estrictos sin escapes innecesarios.
- Dominio separado de interfaz e infraestructura.
- Pruebas nuevas o actualizadas.
- Accesibilidad revisada.
- Documentación y diagrama afectados actualizados.
- Bitácora actualizada.

## Antes de integrar un nivel

- Documento válido.
- Solución manual registrada.
- Sin identificadores duplicados.
- Sin posiciones fuera del tablero.
- Probado con teclado y tacto.
- Texto legible en móvil.
- Regla educativa comprensible.

## Antes de publicar

```powershell
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

Nunca se debilita una validación para obtener una salida verde. Se corrige la causa o se registra el bloqueo.
