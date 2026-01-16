# Script de Limpieza de Caché del Navegador
# Para limpiar localStorage de Chrome/Edge

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  LIMPIEZA DE LOCALSTORAGE - FLORES DELTA" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "INSTRUCCIONES MANUALES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Abre tu navegador en: http://localhost:8082" -ForegroundColor White
Write-Host ""
Write-Host "2. Presiona F12 (o Ctrl + Shift + I)" -ForegroundColor White
Write-Host ""
Write-Host "3. Ve a la pestaña 'Application' (Chrome) o 'Storage' (Firefox)" -ForegroundColor White
Write-Host ""
Write-Host "4. En el panel izquierdo, expande:" -ForegroundColor White
Write-Host "   - Local Storage" -ForegroundColor Gray
Write-Host "   - http://localhost:8082" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Click DERECHO sobre http://localhost:8082" -ForegroundColor White
Write-Host "   Selecciona: 'Clear'" -ForegroundColor Green
Write-Host ""
Write-Host "6. Verificar que NO aparezcan:" -ForegroundColor White
Write-Host "   ❌ token" -ForegroundColor Red
Write-Host "   ❌ user" -ForegroundColor Red
Write-Host "   ❌ GlobalContext" -ForegroundColor Red
Write-Host ""
Write-Host "7. SOLO debe aparecer (opcional):" -ForegroundColor White
Write-Host "   ✅ session_active: 'true'" -ForegroundColor Green
Write-Host ""
Write-Host "8. Cierra DevTools y presiona:" -ForegroundColor White
Write-Host "   Ctrl + Shift + R (Hard Refresh)" -ForegroundColor Yellow
Write-Host ""
Write-Host "9. Haz login de nuevo" -ForegroundColor White
Write-Host ""
Write-Host "10. Verifica de nuevo DevTools → Application → Local Storage" -ForegroundColor White
Write-Host "    Ahora NO debería guardar 'token' ni 'user'" -ForegroundColor Green
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Presiona cualquier tecla para cerrar..." -ForegroundColor Gray
Write-Host "==================================================" -ForegroundColor Cyan

$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
