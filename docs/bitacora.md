# Bitacora - ZelogiG

> Registro append-only. La entrada mas reciente se agrega debajo de este encabezado. No se elimina ni reescribe historia. Estados: COMPLETO, SEGUIMIENTO, BLOQUEADO.

---

## 2026-07-15 - Gobierno, trazabilidad y diagramas incorporados

- **Estado:** COMPLETO
- **Que se hizo:** Se adapto el estandar recibido a ZelogiG mediante un `CLAUDE.md` corto y especifico, bitacora retrospectiva, diagramas Mermaid, reglas de seguridad, auditoria local y un helper para registrar tareas futuras.
- **Decision + porque:** [Seguro] No se copio el estandar completo de forma literal. Varias reglas pertenecen a otros dominios, dependen de Claude Code o introducen herramientas no disponibles. Se conservaron las ideas valiosas sin convertir el repositorio en un manual pesado.
- **Contexto:** Lectura directa del estandar proporcionado por el propietario. `graphify-out/` no estaba disponible y no se genero.
- **Validacion:** Archivos generados por script compatible con Windows PowerShell 5.1; sin NPM ni instalaciones.
- **Costo:** No disponible desde este entorno; no se inventan tokens ni USD.
- **Siguiente paso:** Ejecutar la auditoria local y continuar la construccion del MVP cuando Node.js este disponible.
- **Bloqueos / pendientes de humano:** Node.js bloqueado en el equipo corporativo por politica de la organizacion.

### Decisiones deliberadas, no deshacer

- Mantener `CLAUDE.md` del proyecto corto y especifico.
- No instalar ni ejecutar graphify sin autorizacion humana.
- No inventar costos.
- Git permanece pendiente hasta instruccion del propietario.

---

## 2026-07-15 - Expansion offline del MVP

- **Estado:** COMPLETO
- **Que se hizo:** Se agregaron los niveles 2 al 5, catalogo de niveles, gestos tactiles, progreso local, narracion espacial y listas de continuacion.
- **Decision + porque:** [Seguro] Se avanzo con archivos fuente sin instalar dependencias porque el equipo corporativo impide instalar Node.js.
- **Contexto:** Lectura directa de la estructura creada; graphify ausente.
- **Validacion:** El script genero los archivos sin ejecutar NPM.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Validar tipos y comportamiento cuando exista Node.js.
- **Bloqueos / pendientes de humano:** Ejecutar pruebas reales en un equipo permitido.

---

## 2026-07-15 - Diseno tecnico y esqueleto offline

- **Estado:** COMPLETO
- **Que se hizo:** Se definieron contrato de niveles, motor 2D, parser, movimiento, historial, interfaz base, migracion inicial y primera prueba unitaria.
- **Decision + porque:** [Seguro] El dominio se mantuvo independiente de React y Supabase para reducir acoplamiento.
- **Contexto:** Lectura directa; graphify ausente.
- **Validacion:** Revision estructural del generador; pruebas de TypeScript pendientes por falta de Node.js.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Completar la experiencia jugable y ejecutar pruebas.
- **Bloqueos / pendientes de humano:** Node.js no disponible.

---

## 2026-07-15 - Intento de instalacion de Node.js LTS

- **Estado:** BLOQUEADO
- **Que se hizo:** Se comprobo Git y winget. Se intento instalar Node.js LTS con winget.
- **Decision + porque:** [Seguro] Se detuvieron nuevos intentos al recibir el codigo 1625: una politica de la organizacion impidio la instalacion.
- **Contexto:** Salida directa de PowerShell; graphify no aplica.
- **Validacion:** Git 2.53.0 y winget 1.29.280 disponibles; Node.js ausente.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Instalar Node.js LTS en el equipo personal autorizado.
- **Bloqueos / pendientes de humano:** Politica corporativa de instalacion.

---

## 2026-07-15 - Fundacion inicial de ZelogiG

- **Estado:** COMPLETO
- **Que se hizo:** Se creo la estructura del monolito modular, quince documentos estrategicos, plantillas RFC y ADR, configuracion segura y scripts de comprobacion.
- **Decision + porque:** [Seguro] La fundacion documental precede al codigo para preservar coherencia durante el desarrollo asistido por IA.
- **Contexto:** Requisitos proporcionados directamente por el propietario; graphify ausente.
- **Validacion:** PowerShell 5.1 ejecuto correctamente la version compatible del inicializador.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Disenar el nucleo tecnico sin dependencias.
- **Bloqueos / pendientes de humano:** Ninguno en esa tarea.
