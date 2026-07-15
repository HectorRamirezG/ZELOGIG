#requires -Version 5.1
[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$Titulo,
  [ValidateSet('COMPLETO','SEGUIMIENTO','BLOQUEADO')][string]$Estado = 'COMPLETO',
  [Parameter(Mandatory)][string]$QueSeHizo,
  [Parameter(Mandatory)][string]$Decision,
  [string]$Contexto = 'Lectura directa; graphify no disponible o no requerido.',
  [string]$Validacion = 'Pendiente de validacion adicional.',
  [string]$SiguientePaso = 'Continuar con la siguiente tarea priorizada.',
  [string]$Bloqueos = 'Ninguno.',
  [string]$Costo = 'No disponible desde este entorno.'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$path = Join-Path $root 'docs\bitacora.md'
if (-not (Test-Path -LiteralPath $path)) { throw "No existe $path" }

$date = Get-Date -Format 'yyyy-MM-dd'
$entry = @"
## $date - $Titulo

- **Estado:** $Estado
- **Que se hizo:** $QueSeHizo
- **Decision + porque:** $Decision
- **Contexto:** $Contexto
- **Validacion:** $Validacion
- **Costo:** $Costo
- **Siguiente paso:** $SiguientePaso
- **Bloqueos / pendientes de humano:** $Bloqueos

---

"@

$content = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
$marker = "---"
$index = $content.IndexOf($marker)
if ($index -lt 0) { throw 'La bitacora no contiene el separador esperado.' }
$insertAt = $index + $marker.Length
$updated = $content.Substring(0, $insertAt) + "`r`n`r`n" + $entry + $content.Substring($insertAt).TrimStart("`r", "`n")
[IO.File]::WriteAllText($path, $updated, (New-Object Text.UTF8Encoding($false)))
Write-Host "Bitacora actualizada: $Titulo" -ForegroundColor Green
