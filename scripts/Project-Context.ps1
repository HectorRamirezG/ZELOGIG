#requires -Version 5.1
[CmdletBinding()]
param([int]$RecentEntries = 3)

$root = Split-Path -Parent $PSScriptRoot
Write-Host 'Contexto mínimo para IA' -ForegroundColor Cyan
@('CLAUDE.md','PROJECT_GENESIS.md','docs\STATUS.md','docs\32_decision_backlog.md','docs\33_ai_handoff.md') |
  ForEach-Object { Write-Host "- $_" }
Write-Host "- docs\bitacora.md: $RecentEntries entradas recientes" 
Write-Host 'Después, adjunta solo los archivos relacionados con la tarea.' -ForegroundColor Yellow
