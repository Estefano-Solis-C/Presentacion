# =============================================================================
# SCRIPT DE AUTOMATIZACIÓN DE PRUEBAS DEVOPS Y EJECUCIÓN LOCAL
# Institución Educativa Privada "Dora Mayer de Zulen" (doramayerdezulen.edu.pe)
# =============================================================================

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🏫 I.E.P. Dora Mayer de Zulen — Pipeline de Pruebas DevOps y Docker Local" -ForegroundColor Cyan
Write-Host "=============================================================================`n" -ForegroundColor Cyan

$scriptRoot = $PSScriptRoot
$backendDir = Join-Path $scriptRoot "backend"
$frontendDir = Join-Path $scriptRoot "frontend"

# -----------------------------------------------------------------------------
# FASE 1: PRUEBAS UNITARIAS DE BACKEND (DDD: DOMAIN, APPLICATION, WEB)
# -----------------------------------------------------------------------------
Write-Host "🚀 [FASE 1] Ejecutando Pruebas Unitarias de Arquitectura DDD en Backend..." -ForegroundColor Yellow

$javaVersion = java -version 2>&1
Write-Host "   JDK Detectado: $($javaVersion[0])" -ForegroundColor Gray

if (Get-Command mvn -ErrorAction SilentlyContinue) {
    Set-Location $backendDir
    Write-Host "   Ejecutando 'mvn test'..." -ForegroundColor Gray
    mvn test
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Pruebas Unitarias de Backend COMPLETADAS con Éxito." -ForegroundColor Green
    } else {
        Write-Host "   ❌ Fallo en las pruebas unitarias de backend." -ForegroundColor Red
    }
} else {
    Write-Host "   ℹ️ Maven no está en el PATH global; se ejecutará la validación y empaquetado vía contenedor Docker." -ForegroundColor Gray
}

# -----------------------------------------------------------------------------
# FASE 2: COMPILACIÓN Y VERIFICACIÓN DE FRONTEND (ANGULAR 18 & BUNDLE BUDGET)
# -----------------------------------------------------------------------------
Write-Host "`n🚀 [FASE 2] Verificando Frontend (Angular 18+, i18n en Español y Presupuesto de Bundle)..." -ForegroundColor Yellow
Set-Location $frontendDir

if (Get-Command npm -ErrorAction SilentlyContinue) {
    if (-not (Test-Path "node_modules")) {
        Write-Host "   Instalando dependencias npm..." -ForegroundColor Gray
        npm install
    }
    Write-Host "   Compilando build de producción Angular..." -ForegroundColor Gray
    npm run build -- --configuration production
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Build de Producción de Frontend COMPLETADO dentro del presupuesto (< 250 KB)." -ForegroundColor Green
    } else {
        Write-Host "   ❌ Error en la compilación de Frontend." -ForegroundColor Red
    }
} else {
    Write-Host "   ℹ️ Node/npm no disponible en PATH local; compilación delegada al Dockerfile multi-stage." -ForegroundColor Gray
}

# -----------------------------------------------------------------------------
# FASE 3: VERIFICACIÓN DEL MOTOR DOCKER Y ORQUESTACIÓN LOCAL
# -----------------------------------------------------------------------------
Write-Host "`n🚀 [FASE 3] Verificando Motor Docker y Docker Compose..." -ForegroundColor Yellow
Set-Location $scriptRoot

$dockerRes = docker ps 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Docker Engine activo y en ejecución." -ForegroundColor Green
    Write-Host "   Levantando stack multi-contenedor (BD, Backend, Frontend)..." -ForegroundColor Gray
    docker compose up --build -d
    Write-Host "`n   Estado actual de los contenedores:" -ForegroundColor Cyan
    docker compose ps

    Write-Host "`n🌐 Servicios Locales Disponibles:" -ForegroundColor Green
    Write-Host "   - Frontend (Portal y Admisión): http://localhost:4200" -ForegroundColor White
    Write-Host "   - Backend API REST (Spring Boot): http://localhost:8081/api/v1/eventos" -ForegroundColor White
    Write-Host "   - Actuator Health: http://localhost:8081/actuator/health" -ForegroundColor White
    Write-Host "   - Base de Datos (MySQL/TiDB): localhost:3306 (user: root, pass: mayerino1957)" -ForegroundColor White
} else {
    Write-Host "   ⚠️ El motor de Docker Desktop aún no está completamente iniciado o requiere permisos." -ForegroundColor Yellow
    Write-Host "   Para levantar los contenedores en tu computadora, abre Docker Desktop y luego ejecuta:" -ForegroundColor Gray
    Write-Host "   docker compose up --build -d" -ForegroundColor White
}

Write-Host "`n=============================================================================" -ForegroundColor Cyan
Write-Host "🎉 Proceso de verificación finalizado." -ForegroundColor Cyan
Write-Host "=============================================================================" -ForegroundColor Cyan
