from pydantic import BaseModel, Field
from typing import Optional


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


class PlayerBase(BaseModel):
    """Base player schema."""
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
    """Schema for player response."""
    id: int
    status: bool

    class Config:
        from_attributes = True
