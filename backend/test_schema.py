from app.core import get_db
from app.models.team import TeamPlayer
from app.schemas.team import TeamPlayerResponse

db = next(get_db())

# Test with a player that has zero date
p = db.query(TeamPlayer).filter(TeamPlayer.id == 934).first()
print(f'Raw DOB from DB: {p.dob}, Type: {type(p.dob)}')

try:
    # Try to create Pydantic model
    response = TeamPlayerResponse.model_validate(p)
    print(f'✓ Validation successful!')
    print(f'Response DOB: {response.dob}')
    print(f'Serialized: {response.model_dump()}')
except Exception as e:
    print(f'✗ Validation failed: {e}')

db.close()
