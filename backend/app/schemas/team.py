from pydantic import BaseModel, Field, field_serializer
from typing import Optional
from datetime import date


class TeamBase(BaseModel):
    """Base team schema."""
    team_name: str = Field(..., max_length=250)
    team_name_short: str = Field(..., max_length=50)
    team_logo: Optional[str] = None
    team_coach: Optional[str] = None
    team_manager: Optional[str] = None


class TeamCreate(TeamBase):
    """Schema for creating a team."""
    pass


class TeamResponse(TeamBase):
    """Schema for team response."""
    id: int
    team_type: int
    status: bool

    class Config:
        from_attributes = True


class TeamPlayerBase(BaseModel):
    """Base team player schema."""
    full_name: str = Field(..., max_length=250)
    jersey_name: Optional[str] = None
    jersey_no: Optional[int] = None
    player_position: Optional[int] = None
    profile_image: Optional[str] = None
    status_captain: bool = False
    playing_year: Optional[int] = None


class TeamPlayerResponse(TeamPlayerBase):
    """Schema for team player response."""
    id: int
    team_id: int
    nationality: Optional[int] = None
    dob: Optional[date] = None
    mobile_no: Optional[str] = None
    status: bool

    @field_serializer('dob')
    def serialize_dob(self, dob: Optional[date], _info):
        if dob and dob.year > 1:
            return dob.isoformat()
        return None

    class Config:
        from_attributes = True


class PlayerBase(BaseModel):
    """Base alumni player schema."""
    name: str = Field(..., max_length=255)
    team_id: Optional[int] = None
    position: Optional[str] = None
    jersey_number: Optional[int] = None
    photo: Optional[str] = None
    achievements: Optional[str] = None


class PlayerCreate(PlayerBase):
    """Schema for creating a player."""
    pass


class PlayerResponse(PlayerBase):
    """Schema for alumni player response."""
    id: int
    status: bool

    class Config:
        from_attributes = True
