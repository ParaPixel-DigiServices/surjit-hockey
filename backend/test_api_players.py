from app.core import get_db
from app.models.team import TeamPlayer
from app.schemas.team import TeamPlayerResponse

db = next(get_db())

# Get players for team 36
players_query = db.query(TeamPlayer).filter(TeamPlayer.team_id == 36).order_by(TeamPlayer.jersey_no).limit(10)
players = players_query.all()

print(f'Found {len(players)} players for team 36')

# Try to convert each to response schema
responses = []
for p in players:
    try:
        response = TeamPlayerResponse.model_validate(p)
        responses.append(response)
        print(f'✓ Player {p.id}: {p.full_name} (DOB: {p.dob}) -> Validated')
    except Exception as e:
        print(f'✗ Player {p.id}: {p.full_name} - Error: {e}')

print(f'\nSuccessfully validated {len(responses)} out of {len(players)} players')

if responses:
    print(f'\nFirst player JSON:')
    print(responses[0].model_dump_json(indent=2))

db.close()
