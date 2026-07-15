# Revision del estandar recibido

## Adoptado

- Precedencia entre reglas generales y reglas del proyecto.
- Seguridad estricta y datos externos tratados como no confiables.
- Configuracion fuera del dominio y secretos fuera del repositorio.
- Capas desacopladas.
- Bitacora obligatoria al cerrar tareas.
- Diagramas condicionales y actualizados con el cambio.
- Cambios pequenos y revisables.

## Adaptado

- Las etiquetas de confianza se usan cuando aportan valor, no antes de cada frase obvia.
- Graphify es preferente si existe y fue autorizado, pero no bloquea una tarea pequena con alcance explicito.
- El costo se registra solo cuando el entorno ofrece datos reales.
- La ruta local predeterminada puede existir en scripts, pero siempre debe poder sustituirse por parametro.

## Pospuesto

- Git con ramas `main`, `qa` y `dev`, por decision del propietario.
- Hooks, cobertura y flujo de promocion hasta tener Node.js y repositorio activo.
- Instalacion de graphify hasta evaluar privacidad, utilidad y disponibilidad de Python.

## Rechazado para ZelogiG

- Copiar skills de scraping, Oracle o MCP sin una necesidad del producto.
- Scraping de Google: no aporta al MVP y agrega fragilidad y riesgo contractual.
- Obligar una primera frase confrontativa en todas las respuestas. Se conserva el pensamiento critico, con comunicacion respetuosa.
- Usar Azure Key Vault por defecto. ZelogiG usara variables de entorno y secretos del proveedor aprobado; una boveda adicional requiere RFC.

## Consejo principal

Una regla repetida debe convertirse en automatizacion verificable. Por eso este paquete agrega auditoria y escritura controlada de bitacora, en lugar de confiar solo en memoria conversacional.
