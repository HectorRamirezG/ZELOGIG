# Entrega de contexto a otra IA

## Paquete mínimo

1. `CLAUDE.md`.
2. `PROJECT_GENESIS.md`.
3. `docs/STATUS.md`.
4. Las tres entradas más recientes de `docs/bitacora.md`.
5. El documento de decisión relacionado.
6. Solo los archivos de código afectados.

## Prompt base

```text
Trabaja en ZelogiG. Antes de modificar, lee CLAUDE.md, PROJECT_GENESIS.md, docs/STATUS.md y las tres entradas recientes de docs/bitacora.md.

Tarea: [describir un resultado pequeño y verificable].

Primero presenta la decisión técnica, alternativas, costo, riesgos, impacto y reversibilidad. No modifiques arquitectura o código hasta recibir aprobación cuando la tarea cambie dependencias, datos, contratos del motor o experiencia central.

No inventes pruebas. No agregues dependencias por comodidad. Mantén el dominio independiente de React y Supabase. Al cerrar, actualiza documentación, diagramas y bitácora.
```

## Si la IA no puede editar archivos

Debe entregar:

- Ruta exacta.
- Contenido completo o parche claro.
- Comandos de validación.
- Resultado esperado.
- Entrada de bitácora preparada.
