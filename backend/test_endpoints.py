"""Quick test script for new endpoints."""
import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

endpoints = [
    ("/additional/streaming", "Streaming"),
    ("/additional/timer", "Timer"),
    ("/additional/capacities", "Capacities"),
    ("/additional/levels", "Levels"),
    ("/additional/identities?limit=3", "Identities (limit 3)"),
    ("/content/advertisements", "Advertisements"),
    ("/tournaments/categories/all", "Categories"),
    ("/additional/matches/48/reports", "Match Reports (match 48)"),
    ("/additional/matches/48/goals", "Goal Details (match 48)"),
]

print("Testing New API Endpoints")
print("=" * 60)

for endpoint, name in endpoints:
    url = f"{BASE_URL}{endpoint}"
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ {name}: {len(data)} records")
            else:
                print(f"✅ {name}: 1 record")
        else:
            print(f"❌ {name}: HTTP {response.status_code}")
            if response.text:
                print(f"   Response: {response.text[:100]}")
    except Exception as e:
        print(f"❌ {name}: {str(e)}")

print("=" * 60)
