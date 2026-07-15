#requires -Version 5.1
$ErrorActionPreference = 'Stop'

Write-Host "Comprobacion no invasiva de ZelogiG" -ForegroundColor Cyan
Write-Host "PowerShell: $($PSVersionTable.PSVersion)"

$commands = @('git', 'node')
foreach ($command in $commands) {
    $found = Get-Command $command -ErrorAction SilentlyContinue
    if ($null -eq $found) {
        Write-Host "FALTA: $command" -ForegroundColor Yellow
        continue
    }

    $version = & $command --version 2>$null
    Write-Host "OK: $command $version" -ForegroundColor Green
}

Write-Host "No se ejecuto npm ni se instalo ningun paquete." -ForegroundColor Cyan
