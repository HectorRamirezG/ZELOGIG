#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Archivo de referencia rápida: comandos clave para validar ZelogiG.
.DESCRIPTION
  Copia y pega estos comandos en un entorno con Node.js 20+ para validar el MVP.
#>

Write-Host @"
╔═══════════════════════════════════════════════════════════════════════╗
║  ZelogiG MVP - Referencia Rápida de Validación                        ║
╚═══════════════════════════════════════════════════════════════════════╝

REQUISITOS:
  - Node.js 20+
  - npm 10+

INSTALACIÓN Y SETUP:
  cd C:\Dev\ZelogiG
  npm ci

VALIDACIÓN RÁPIDA (recomendado primero):
  npm test -- --run
  npm run typecheck

DESARROLLO LOCAL (para jugar):
  npm run dev
  # Abre http://localhost:3000

BUILD PARA PRODUCCIÓN:
  npm run build

LIMPIAR CACHE:
  npm run clean

FLUJO COMPLETO (all-in-one):
  npm ci && npm run typecheck && npm test -- --run && npm run build

═══════════════════════════════════════════════════════════════════════

ESTRUCTURA DEL PROYECTO:
  src/app/page.tsx               → Interfaz principal del juego
  src/components/game/           → Componentes de UI reactivos
  src/features/game/domain/      → Motor puro (sin React)
  src/features/levels/data/      → Definiciones de nivel
  src/features/progress/         → Persistencia local
  tests/unit/                    → Suite de pruebas Vitest

═══════════════════════════════════════════════════════════════════════

QUÉ VALIDAR EN NAVEGADOR (http://localhost:3000):
  ✓ Interfaz carga sin errores
  ✓ Seleccionar nivel cambia tablero
  ✓ Flechas/WASD mueven el jugador
  ✓ Botones direccionales funcionan
  ✓ Deslizar con tactil mueve el jugador
  ✓ Deshacer restaura estado anterior
  ✓ Reiniciar vuelve al inicio
  ✓ Completar nivel muestra victoria
  ✓ Progreso se guarda en localStorage
  ✓ Reglas activas se muestran y actualizan
  ✓ Anuncios de estado (ARIA) funcionan

═══════════════════════════════════════════════════════════════════════

SI FALLA ALGO:
  1. Verifica errores TypeScript: npm run typecheck
  2. Revisa salida de tests: npm test
  3. Lee la consola del navegador (F12 → Console)
  4. Consulta .next/static/ si hay CSS faltante

═══════════════════════════════════════════════════════════════════════
" -ForegroundColor Cyan
