"""
Activate all inactive teams needed for honours display
"""
from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

# Get all inactive teams
with engine.connect() as conn:
    result = conn.execute(
        text('SELECT id, team_name, status FROM hockey_team_master WHERE status = 0'))
    inactive_teams = result.fetchall()

    print(f"Found {len(inactive_teams)} inactive teams")
    print("-" * 60)

    for team in inactive_teams:
        print(f"Activating: ID {team[0]} - {team[1]}")
        conn.execute(
            text('UPDATE hockey_team_master SET status = 1 WHERE id = :id'),
            {'id': team[0]}
        )

    conn.commit()
    print(f"\n✓ Activated {len(inactive_teams)} teams")
