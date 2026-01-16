# Script para corregir URLs hardcodeadas en PlantTimeline.tsx
# Debe ejecutarse cuando el dev server NO esté corriendo

$filePath = "src\Components\plant\PlantTimeline.tsx"
$content = Get-Content $filePath -Raw -Encoding UTF8

# Reemplazar la URL hardcodeada en la línea 60
$content = $content -replace 
'src=\{`http://localhost:8080\$\{url\}`\}', 
'src={`${import.meta.env.VITE_API_URL || ''http://localhost:8080''}${url}`}'

# Guardar el archivo
$content | Set-Content $filePath -Encoding UTF8 -NoNewline

Write-Host "✅ PlantTimeline.tsx actualizado correctamente" -ForegroundColor Green
