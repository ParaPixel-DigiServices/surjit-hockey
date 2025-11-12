# API Testing Script for Surjit Hockey Backend
# This script tests all API endpoints

$baseUrl = "http://127.0.0.1:8000"
$token = ""

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Surjit Hockey API Testing" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Root endpoint
Write-Host "TEST 1: Root Endpoint" -ForegroundColor Yellow
Write-Host "GET /" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Health Check
Write-Host "TEST 2: Health Check" -ForegroundColor Yellow
Write-Host "GET /health" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Register User
Write-Host "TEST 3: Register New User" -ForegroundColor Yellow
Write-Host "POST /api/v1/auth/register" -ForegroundColor Gray
$registerData = @{
    username = "testuser"
    email = "test@example.com"
    password = "TestPassword123!"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/auth/register" -Method Post -Body $registerData -ContentType "application/json"
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Details: $($errorDetails.detail)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Login
Write-Host "TEST 4: Login User" -ForegroundColor Yellow
Write-Host "POST /api/v1/auth/login" -ForegroundColor Gray
$loginData = "username=testuser&password=TestPassword123!"

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/auth/login" -Method Post -Body $loginData -ContentType "application/x-www-form-urlencoded"
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
    $token = $response.access_token
    Write-Host "Token saved for subsequent requests" -ForegroundColor Cyan
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Details: $($errorDetails.detail)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Get Current User
if ($token) {
    Write-Host "TEST 5: Get Current User" -ForegroundColor Yellow
    Write-Host "GET /api/v1/auth/me" -ForegroundColor Gray
    try {
        $headers = @{
            Authorization = "Bearer $token"
        }
        $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/auth/me" -Method Get -Headers $headers
        Write-Host "Response:" -ForegroundColor Green
        $response | ConvertTo-Json
    } catch {
        Write-Host "Error: $_" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 6: Get Tournaments
Write-Host "TEST 6: Get All Tournaments" -ForegroundColor Yellow
Write-Host "GET /api/v1/tournaments" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/tournaments" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 7: Get Active Tournaments
Write-Host "TEST 7: Get Active Tournaments" -ForegroundColor Yellow
Write-Host "GET /api/v1/tournaments?is_active=true" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/tournaments?is_active=true" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 8: Get Teams
Write-Host "TEST 8: Get All Teams" -ForegroundColor Yellow
Write-Host "GET /api/v1/teams" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/teams" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 9: Get Gallery Items
Write-Host "TEST 9: Get Gallery Items" -ForegroundColor Yellow
Write-Host "GET /api/v1/content/gallery" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/content/gallery" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 10: Get Memories
Write-Host "TEST 10: Get Memories" -ForegroundColor Yellow
Write-Host "GET /api/v1/content/memories" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/content/memories" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 11: Get Active Banners
Write-Host "TEST 11: Get Active Banners" -ForegroundColor Yellow
Write-Host "GET /api/v1/content/banners/active" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/content/banners/active" -Method Get
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Testing Complete!" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
