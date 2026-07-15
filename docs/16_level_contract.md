# Contrato de niveles v1

## Objetivo

Definir un formato pequeno, versionado y validable para representar niveles sin mezclar reglas, apariencia y progreso.

## Reglas

- Cada nivel declara `schemaVersion`.
- La cuadricula usa coordenadas enteras desde cero.
- Una celda puede contener varios bloques para permitir texto sobre terreno.
- Cada bloque posee un identificador unico dentro del nivel.
- El nivel no contiene clases de Tailwind ni secretos.
- El motor rechaza dimensiones invalidas, posiciones fuera del mapa e identificadores repetidos.

## Componentes

- Metadatos: id, titulo, dificultad y objetivo.
- Tablero: ancho, alto y bloques.
- Diccionario local del nivel: definiciones semanticamente estables.
- Condicion de victoria: expresada con reglas deterministas.

Consulta `src/features/levels/domain/level.types.ts` y `src/features/levels/data/level-001.ts`.
