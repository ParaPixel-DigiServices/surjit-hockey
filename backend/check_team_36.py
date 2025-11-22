from app.core import get_db
from app.models.team import TeamPlayer
from sqlalchemy.orm import Session

db = next(get_db())

# Get players for team 36
players = db.query(TeamPlayer).filter(TeamPlayer.team_id == 36).all()
print(f'Team 36 has {len(players)} players')

for p in players:
    print(f'\nPlayer {p.id}: {p.full_name}')
    print(f'  Jersey: {p.jersey_no}')
    print(f'  DOB: {p.dob} (type: {type(p.dob)})')
    print(f'  Status: {p.status}')
    print(f'  Position: {p.player_position}')
    print(f'  Captain: {p.status_captain}')

db.close()
