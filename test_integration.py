"""Test frontend-backend integration."""
import requests
import json
from time import sleep

BACKEND_URL = "http://localhost:8000/api/v1"
FRONTEND_URL = "http://localhost:5173"


def test_backend_endpoints():
    """Test all key backend endpoints."""
    print("\n" + "="*80)
    print("🔧 TESTING BACKEND API ENDPOINTS")
    print("="*80)

    endpoints_to_test = [
        ("GET", "/tournaments", "Tournaments list"),
        ("GET", "/teams", "Teams list"),
        ("GET", "/news", "News list"),
        ("GET", "/content/gallery", "Gallery"),
        ("GET", "/officials", "Officials"),
        ("GET", "/sponsors", "Sponsors"),
        ("GET", "/banners/active", "Active banners"),
        ("GET", "/additional/years", "Tournament years"),
        ("GET", "/additional/pools", "Pools"),
        ("GET", "/additional/honours", "Honours"),
        ("GET", "/additional/streaming", "Live streaming"),
        ("GET", "/additional/timer", "Tournament timer"),
        ("GET", "/tournaments/categories/all", "Categories"),
        ("GET", "/content/advertisements", "Advertisements"),
    ]

    results = {"success": 0, "failed": 0, "errors": []}

    for method, endpoint, description in endpoints_to_test:
        url = f"{BACKEND_URL}{endpoint}"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else 1
                print(
                    f"  ✅ {description:30} | {count:3} records | {response.status_code}")
                results["success"] += 1
            else:
                print(f"  ❌ {description:30} | HTTP {response.status_code}")
                results["failed"] += 1
                results["errors"].append(
                    f"{endpoint}: HTTP {response.status_code}")
        except Exception as e:
            print(f"  ❌ {description:30} | ERROR: {str(e)[:50]}")
            results["failed"] += 1
            results["errors"].append(f"{endpoint}: {str(e)[:50]}")

    return results


def test_cors():
    """Test CORS configuration."""
    print("\n" + "="*80)
    print("🌐 TESTING CORS CONFIGURATION")
    print("="*80)

    try:
        response = requests.options(
            f"{BACKEND_URL}/tournaments",
            headers={"Origin": "http://localhost:5173"},
            timeout=5
        )
        cors_headers = {
            "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
            "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods"),
            "Access-Control-Allow-Headers": response.headers.get("Access-Control-Allow-Headers"),
        }

        if cors_headers["Access-Control-Allow-Origin"]:
            print(f"  ✅ CORS Enabled")
            print(
                f"     Origin: {cors_headers['Access-Control-Allow-Origin']}")
            if cors_headers["Access-Control-Allow-Methods"]:
                print(
                    f"     Methods: {cors_headers['Access-Control-Allow-Methods']}")
            return True
        else:
            print(f"  ⚠️ CORS headers not found in response")
            return False
    except Exception as e:
        print(f"  ❌ CORS test failed: {str(e)}")
        return False


def test_frontend():
    """Test if frontend is accessible."""
    print("\n" + "="*80)
    print("🎨 TESTING FRONTEND")
    print("="*80)

    try:
        response = requests.get(FRONTEND_URL, timeout=5)
        if response.status_code == 200:
            print(f"  ✅ Frontend accessible at {FRONTEND_URL}")
            print(f"     Status: {response.status_code}")
            print(f"     Content-Type: {response.headers.get('Content-Type')}")
            return True
        else:
            print(f"  ❌ Frontend returned HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"  ❌ Cannot reach frontend: {str(e)}")
        return False


def main():
    print("\n" + "="*80)
    print("🔍 FRONTEND-BACKEND INTEGRATION TEST")
    print("="*80)
    print(f"Backend: {BACKEND_URL}")
    print(f"Frontend: {FRONTEND_URL}")

    # Test backend
    backend_results = test_backend_endpoints()

    # Test CORS
    cors_ok = test_cors()

    # Test frontend
    frontend_ok = test_frontend()

    # Summary
    print("\n" + "="*80)
    print("📊 INTEGRATION TEST SUMMARY")
    print("="*80)
    print(
        f"Backend Endpoints: {backend_results['success']}/{backend_results['success'] + backend_results['failed']} passing")
    print(f"CORS Configuration: {'✅ OK' if cors_ok else '❌ FAILED'}")
    print(
        f"Frontend Server: {'✅ Running' if frontend_ok else '❌ Not accessible'}")

    if backend_results["errors"]:
        print(f"\n⚠️ Issues Found ({len(backend_results['errors'])}):")
        for error in backend_results["errors"][:5]:
            print(f"  • {error}")

    # Overall status
    # +2 for cors and frontend
    total_tests = backend_results['success'] + backend_results['failed'] + 2
    passed_tests = backend_results['success'] + \
        (1 if cors_ok else 0) + (1 if frontend_ok else 0)
    pass_rate = (passed_tests / total_tests) * 100

    print(f"\n{'='*80}")
    print(
        f"Overall Pass Rate: {pass_rate:.1f}% ({passed_tests}/{total_tests} tests)")

    if pass_rate >= 90:
        print("Status: 🟢 EXCELLENT - Integration working well!")
    elif pass_rate >= 70:
        print("Status: 🟡 GOOD - Minor issues to address")
    elif pass_rate >= 50:
        print("Status: 🟠 FAIR - Several issues need attention")
    else:
        print("Status: 🔴 POOR - Significant integration problems")

    print("="*80 + "\n")


if __name__ == "__main__":
    main()
