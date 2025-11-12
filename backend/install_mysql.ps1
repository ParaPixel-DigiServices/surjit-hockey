# Quick MySQL Installation Script
# Run this script as Administrator

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "MySQL Installation Helper" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  Please run this script as Administrator!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "Then run: cd backend; .\install_mysql.ps1" -ForegroundColor Cyan
    exit
}

Write-Host "Choose installation option:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Install XAMPP (Recommended - includes phpMyAdmin)" -ForegroundColor Green
Write-Host "2. Install MySQL Server only" -ForegroundColor Green
Write-Host "3. Exit" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Installing XAMPP 8.2..." -ForegroundColor Cyan
        Write-Host "This may take several minutes..." -ForegroundColor Gray
        Write-Host ""
        
        try {
            winget install -e --id ApacheFriends.Xampp.8.2 --accept-package-agreements --accept-source-agreements
            
            Write-Host ""
            Write-Host "✓ XAMPP installed successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Yellow
            Write-Host "1. Open XAMPP Control Panel: C:\xampp\xampp-control.exe" -ForegroundColor Cyan
            Write-Host "2. Click 'Start' next to MySQL" -ForegroundColor Cyan
            Write-Host "3. Update backend\.env file with database credentials" -ForegroundColor Cyan
            Write-Host "4. Run: python test_db.py" -ForegroundColor Cyan
        } catch {
            Write-Host "✗ Installation failed: $_" -ForegroundColor Red
            Write-Host ""
            Write-Host "Manual installation:" -ForegroundColor Yellow
            Write-Host "1. Download from: https://www.apachefriends.org/download.html" -ForegroundColor Cyan
            Write-Host "2. Run the installer" -ForegroundColor Cyan
        }
    }
    "2" {
        Write-Host ""
        Write-Host "Installing MySQL Server..." -ForegroundColor Cyan
        Write-Host "This may take several minutes..." -ForegroundColor Gray
        Write-Host ""
        
        try {
            winget install -e --id Oracle.MySQL --accept-package-agreements --accept-source-agreements
            
            Write-Host ""
            Write-Host "✓ MySQL installed successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Yellow
            Write-Host "1. Start MySQL service: Start-Service MySQL80" -ForegroundColor Cyan
            Write-Host "2. Set root password: mysql -u root" -ForegroundColor Cyan
            Write-Host "3. Update backend\.env file with credentials" -ForegroundColor Cyan
            Write-Host "4. Run: python test_db.py" -ForegroundColor Cyan
        } catch {
            Write-Host "✗ Installation failed: $_" -ForegroundColor Red
            Write-Host ""
            Write-Host "Manual installation:" -ForegroundColor Yellow
            Write-Host "1. Download from: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Cyan
            Write-Host "2. Run the MSI installer" -ForegroundColor Cyan
        }
    }
    "3" {
        Write-Host "Exiting..." -ForegroundColor Gray
        exit
    }
    default {
        Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
