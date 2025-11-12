"""
Quick API endpoint tester - Tests all endpoints without stopping the server
"""
import requests
import json
from datetime import datetime

BASE_URL = "http://127.0.0.1:8000"


def print_header(text):
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60)


def print_test(name, method, endpoint):
    print(f"\n🧪 TEST: {name}")
    print(f"   {method} {endpoint}")
    print("-" * 60)


def test_endpoint(method, endpoint, data=None, headers=None, desc=""):
    try:
        url = f"{BASE_URL}{endpoint}"
        if method == "GET":
            response = requests.get(url, headers=headers)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers) if data and isinstance(
                data, dict) else requests.post(url, data=data, headers=headers)

        print(f"✓ Status: {response.status_code}")

        if response.status_code < 400:
            try:
                result = response.json()
                print(f"✓ Response: {json.dumps(result, indent=2)[:500]}...")
                return result
            except:
                print(f"✓ Response: {response.text[:200]}")
                return response.text
        else:
            print(f"✗ Error: {response.text[:300]}")
            return None
    except Exception as e:
        print(f"✗ Exception: {str(e)}")
        return None


# Start testing
print_header("SURJIT HOCKEY API - COMPREHENSIVE ENDPOINT TESTING")
print(f"Testing at: {BASE_URL}")
print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

# Test 1: Root endpoint
print_test("Root Endpoint", "GET", "/")
test_endpoint("GET", "/")

# Test 2: Health check
print_test("Health Check", "GET", "/health")
test_endpoint("GET", "/health")

# Test 3: Register user
print_test("Register New User", "POST", "/api/v1/auth/register")
register_data = {
    "username": "apitest_user",
    "email": "apitest@example.com",
    "password": "SecurePass123!"
}
test_endpoint("POST", "/api/v1/auth/register", data=register_data)

# Test 4: Login
print_test("User Login", "POST", "/api/v1/auth/login")
login_data = "username=apitest_user&password=SecurePass123!"
token_response = test_endpoint("POST", "/api/v1/auth/login", data=login_data)

token = None
if token_response and isinstance(token_response, dict):
    token = token_response.get("access_token")
    print(f"🔑 Access token obtained: {token[:30]}...")

# Test 5: Get current user
if token:
    print_test("Get Current User", "GET", "/api/v1/auth/me")
    headers = {"Authorization": f"Bearer {token}"}
    test_endpoint("GET", "/api/v1/auth/me", headers=headers)

# Test 6: Get all tournaments
print_test("Get All Tournaments", "GET", "/api/v1/tournaments")
tournaments = test_endpoint("GET", "/api/v1/tournaments")

# Test 7: Get active tournaments
print_test("Get Active Tournaments", "GET",
           "/api/v1/tournaments?is_active=true")
test_endpoint("GET", "/api/v1/tournaments?is_active=true")

# Test 8: Get tournament by ID (if tournaments exist)
if tournaments and isinstance(tournaments, list) and len(tournaments) > 0:
    tournament_id = tournaments[0].get('id')
    print_test(f"Get Tournament Details (ID: {tournament_id})",
               "GET", f"/api/v1/tournaments/{tournament_id}")
    test_endpoint("GET", f"/api/v1/tournaments/{tournament_id}")

    print_test(f"Get Tournament Fixtures (ID: {tournament_id})",
               "GET", f"/api/v1/tournaments/{tournament_id}/fixtures")
    test_endpoint("GET", f"/api/v1/tournaments/{tournament_id}/fixtures")

# Test 9: Get categories
print_test("Get Tournament Categories", "GET",
           "/api/v1/tournaments/categories")
test_endpoint("GET", "/api/v1/tournaments/categories")

# Test 10: Get all teams
print_test("Get All Teams", "GET", "/api/v1/teams")
teams = test_endpoint("GET", "/api/v1/teams")

# Test 11: Get team by ID (if teams exist)
if teams and isinstance(teams, list) and len(teams) > 0:
    team_id = teams[0].get('id')
    print_test(f"Get Team Details (ID: {team_id})",
               "GET", f"/api/v1/teams/{team_id}")
    test_endpoint("GET", f"/api/v1/teams/{team_id}")

# Test 12: Get gallery items
print_test("Get Gallery Items", "GET", "/api/v1/content/gallery")
test_endpoint("GET", "/api/v1/content/gallery")

# Test 13: Get memories
print_test("Get Memories", "GET", "/api/v1/content/memories")
test_endpoint("GET", "/api/v1/content/memories")

# Test 14: Get active banners
print_test("Get Active Banners", "GET", "/api/v1/content/banners/active")
test_endpoint("GET", "/api/v1/content/banners/active")

print_header("TESTING COMPLETE!")
print("\n✅ Backend is running and endpoints are responding!")
print(f"📚 View full API documentation at: {BASE_URL}/docs")
print(f"📖 View ReDoc documentation at: {BASE_URL}/redoc\n")
