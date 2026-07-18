#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Valida el MVP de ZelogiG: tests, build, tipo-seguridad.
.DESCRIPTION
  Script que ejecuta todas las validaciones antes de considerar el MVP listo.
  Requiere: Node.js 20+, npm 10+.
.EXAMPLE
  ./Validate-MVP.ps1
#>

param(
  [switch]$Dev = $false,
  [switch]$Build = $false,
  [switch]$Full = $false
)

$ErrorActionPreference = "Stop"

function Write-Status {
  param([string]$Message, [string]$Status = "INFO")
  $colors = @{
    INFO    = 'Cyan'
    SUCCESS = 'Green'
    WARNING = 'Yellow'
    ERROR   = 'Red'
  }
  Write-Host "[$Status] $Message" -ForegroundColor $colors[$Status]
}

Write-Host ""
Write-Status "ZelogiG MVP Validation" "INFO"
Write-Host ""

try {
  node --version | Out-String | Write-Status -Status "Node.js"
  npm --version | Out-String | Write-Status -Status "npm"
} catch {
  Write-Status "Node.js o npm no disponibles. Por favor, instala Node.js 20+." "ERROR"
  exit 1
}

Write-Host ""
Write-Status "Instalando dependencias..." "INFO"
npm ci --silent

Write-Status "Ejecutando linter TypeScript..." "INFO"
npm run typecheck 2>&1 | Select-Object -First 20

Write-Status "Ejecutando pruebas unitarias..." "INFO"
npm test -- --run 2>&1 | Tee-Object -Variable testOutput
if ($LASTEXITCODE -ne 0) {
  Write-Status "Tests fallaron. Revisa los errores arriba." "ERROR"
  exit 1
}

if ($Build) {
  Write-Status "Compilando proyecto..." "INFO"
  npm run build 2>&1 | Select-Object -First 30
  if ($LASTEXITCODE -ne 0) {
    Write-Status "Build falló." "ERROR"
    exit 1
  }
}

if ($Dev) {
  Write-Status "Iniciando servidor de desarrollo..." "INFO"
  Write-Host "Abre http://localhost:3000 en tu navegador."
  npm run dev
}

if ($Full) {
  Write-Status "Ejecutando build completo..." "INFO"
  npm run build
  Write-Status "Build completado. Archivo: .next/" "SUCCESS"
}

Write-Host ""
Write-Status "Validación completada. MVP listo para revisar." "SUCCESS"
Write-Host ""
