from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text('''
        SELECT id, team_name, team_type, status 
        FROM hockey_team_master 
        WHERE team_name LIKE "%Westren%" 
           OR team_name LIKE "%Haryana%" 
           OR team_name LIKE "%RCF%"
        ORDER BY id
    '''))

    print("Teams matching Westren/Haryana/RCF:")
    print("-" * 60)
    for row in result:
        print(
            f"ID: {row[0]:<3} | Name: {row[1]:<30} | Type: {row[2]} | Status: {row[3]}")
