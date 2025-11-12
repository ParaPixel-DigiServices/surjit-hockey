"""Test database connection and basic operations."""
from sqlalchemy import text
from app.core.config import settings
from app.core.database import engine, get_db
import sys
sys.path.insert(0, '.')


print("=" * 50)
print("Database Connection Test")
print("=" * 50)
print(f"Database URL: {settings.DATABASE_URL}")
print()

try:
    # Test connection
    with engine.connect() as connection:
        print("✓ Database connection successful!")

        # Test query
        result = connection.execute(text("SELECT VERSION()"))
        version = result.scalar()
        print(f"✓ MySQL Version: {version}")

        # Check if database exists
        result = connection.execute(
            text("SHOW DATABASES LIKE 'surjit_hockey'"))
        db_exists = result.fetchone()

        if db_exists:
            print("✓ Database 'surjit_hockey' exists")

            # Show tables
            connection.execute(text("USE surjit_hockey"))
            result = connection.execute(text("SHOW TABLES"))
            tables = result.fetchall()
            print(f"✓ Found {len(tables)} tables:")
            for table in tables:
                print(f"  - {table[0]}")
        else:
            print("✗ Database 'surjit_hockey' does not exist")
            print("\nPlease create the database using:")
            print("CREATE DATABASE surjit_hockey;")

except Exception as e:
    print(f"✗ Error: {e}")
    print("\nTroubleshooting:")
    print("1. Check if MySQL is running")
    print("2. Verify credentials in .env file")
    print("3. Ensure database exists")

print()
print("=" * 50)
