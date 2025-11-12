"""Quick test to see if we can query tournaments"""
from sqlalchemy import text
from app.core.database import engine
import sys
sys.path.insert(0, '.')


print("Testing tournament query...")

try:
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT * FROM hockey_event_master LIMIT 2"))
        rows = result.fetchall()
        print(f"\n✓ Found {len(rows)} tournaments")
        for row in rows:
            print(f"  ID: {row[0]}, Title: {row[1]}, Status: {row[8]}")

        # Test with SQLAlchemy model
        from sqlalchemy.orm import Session
        from app.models.tournament import Tournament

        with Session(engine) as session:
            tournaments = session.query(Tournament).limit(2).all()
            print(
                f"\n✓ SQLAlchemy query returned {len(tournaments)} tournaments")
            for t in tournaments:
                print(f"  ID: {t.id}, Title: {t.event_title}")

except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
