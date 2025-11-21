# Frontend-Backend Integration Test
Write-Host "`n$('='*80)" -ForegroundColor Cyan
Write-Host "FRONTEND-BACKEND INTEGRATION TEST" -ForegroundColor Cyan
Write-Host "$('='*80)" -ForegroundColor Cyan

$backendUrl = "http://localhost:8000/api/v1"
$frontendUrl = "http://localhost:5173"

Write-Host "`nBackend: $backendUrl"
Write-Host "Frontend: $frontendUrl"

# Test Backend Endpoints
Write-Host "`n$('='*80)" -ForegroundColor Yellow
Write-Host "TESTING BACKEND API ENDPOINTS" -ForegroundColor Yellow
Write-Host "$('='*80)" -ForegroundColor Yellow

$endpoints = @(
    @{Path="/tournaments"; Name="Tournaments"},
    @{Path="/teams"; Name="Teams"},
    @{Path="/news"; Name="News"},
    @{Path="/content/gallery"; Name="Gallery"},
    @{Path="/officials"; Name="Officials"},
    @{Path="/sponsors"; Name="Sponsors"},
    @{Path="/banners/active"; Name="Banners"},
    @{Path="/additional/years"; Name="Tournament Years"},
    @{Path="/additional/pools"; Name="Pools"},
    @{Path="/additional/honours"; Name="Honours"},
    @{Path="/additional/streaming"; Name="Live Streaming"},
    @{Path="/additional/timer"; Name="Timer"},
    @{Path="/tournaments/categories/all"; Name="Categories"},
    @{Path="/content/advertisements"; Name="Advertisements"}
)

$successCount = 0
$failCount = 0
$errors = @()

foreach ($endpoint in $endpoints) {
    $url = "$backendUrl$($endpoint.Path)"
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            $data = $response.Content | ConvertFrom-Json
            $count = if ($data -is [Array]) { $data.Count } else { 1 }
            Write-Host "  " -NoNewline
            Write-Host "✅" -ForegroundColor Green -NoNewline
            Write-Host " $($endpoint.Name.PadRight(30)) | $($count.ToString().PadLeft(3)) records | $($response.StatusCode)"
            $successCount++
        }
    } catch {
        Write-Host "  " -NoNewline
        Write-Host "❌" -ForegroundColor Red -NoNewline
        Write-Host " $($endpoint.Name.PadRight(30)) | ERROR: $($_.Exception.Message.Substring(0, [Math]::Min(50, $_.Exception.Message.Length)))"
        $failCount++
        $errors += "$($endpoint.Path): $($_.Exception.Message)"
    }
}

# Test CORS
Write-Host "`n$('='*80)" -ForegroundColor Yellow
Write-Host "TESTING CORS CONFIGURATION" -ForegroundColor Yellow
Write-Host "$('='*80)" -ForegroundColor Yellow

try {
    $headers = @{
        "Origin" = "http://localhost:5173"
    }
    $response = Invoke-WebRequest -Uri "$backendUrl/tournaments" -Headers $headers -Method Options -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $corsOrigin = $response.Headers["Access-Control-Allow-Origin"]
    
    if ($corsOrigin) {
        Write-Host "  " -NoNewline
        Write-Host "✅" -ForegroundColor Green -NoNewline
        Write-Host " CORS Enabled"
        Write-Host "     Origin: $corsOrigin"
        $corsOk = $true
    } else {
        Write-Host "  " -NoNewline
        Write-Host "⚠️" -ForegroundColor Yellow -NoNewline
        Write-Host " CORS headers not found"
        $corsOk = $false
    }
} catch {
    Write-Host "  " -NoNewline
    Write-Host "❌" -ForegroundColor Red -NoNewline
    Write-Host " CORS test failed: $($_.Exception.Message)"
    $corsOk = $false
}

# Test Frontend
Write-Host "`n$('='*80)" -ForegroundColor Yellow
Write-Host "TESTING FRONTEND" -ForegroundColor Yellow
Write-Host "$('='*80)" -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  " -NoNewline
        Write-Host "✅" -ForegroundColor Green -NoNewline
        Write-Host " Frontend accessible at $frontendUrl"
        Write-Host "     Status: $($response.StatusCode)"
        Write-Host "     Content-Type: $($response.Headers['Content-Type'])"
        $frontendOk = $true
    }
} catch {
    Write-Host "  " -NoNewline
    Write-Host "❌" -ForegroundColor Red -NoNewline
    Write-Host " Cannot reach frontend: $($_.Exception.Message)"
    $frontendOk = $false
}

# Summary
Write-Host "`n$('='*80)" -ForegroundColor Cyan
Write-Host "INTEGRATION TEST SUMMARY" -ForegroundColor Cyan
Write-Host "$('='*80)" -ForegroundColor Cyan

$totalTests = $successCount + $failCount + 2
$passedTests = $successCount + $(if ($corsOk) {1} else {0}) + $(if ($frontendOk) {1} else {0})
$passRate = ($passedTests / $totalTests) * 100

Write-Host "Backend Endpoints: $successCount/$($successCount + $failCount) passing"
Write-Host "CORS Configuration: $(if ($corsOk) {'✅ OK'} else {'❌ FAILED'})"
Write-Host "Frontend Server: $(if ($frontendOk) {'✅ Running'} else {'❌ Not accessible'})"

if ($errors.Count -gt 0) {
    Write-Host "`n⚠️ Issues Found ($($errors.Count)):" -ForegroundColor Yellow
    $errors | Select-Object -First 5 | ForEach-Object {
        Write-Host "  • $_" -ForegroundColor Yellow
    }
}

Write-Host "`n$('='*80)"
Write-Host "Overall Pass Rate: $([Math]::Round($passRate, 1))% ($passedTests/$totalTests tests)"

if ($passRate -ge 90) {
    Write-Host "Status: 🟢 EXCELLENT - Integration working well!" -ForegroundColor Green
} elseif ($passRate -ge 70) {
    Write-Host "Status: 🟡 GOOD - Minor issues to address" -ForegroundColor Yellow
} elseif ($passRate -ge 50) {
    Write-Host "Status: 🟠 FAIR - Several issues need attention" -ForegroundColor DarkYellow
} else {
    Write-Host "Status: 🔴 POOR - Significant integration problems" -ForegroundColor Red
}

Write-Host "$('='*80)`n"

# Open browser for visual confirmation
Write-Host "Opening frontend in browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173"
Start-Sleep -Seconds 2
Write-Host "Opening API documentation..." -ForegroundColor Cyan
Start-Process "http://localhost:8000/docs"
