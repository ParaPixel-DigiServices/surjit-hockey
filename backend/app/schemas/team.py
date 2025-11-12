from pydantic import BaseModel, Field
from typing import Optional


class TeamBase(BaseModel):
    """Base team schema."""
    team_name: str = Field(..., max_length=255)
    team_code: Optional[str] = Field(None, max_length=50)
    logo: Optional[str] = None
    description: Optional[str] = None


class TeamCreate(TeamBase):
    """Schema for creating a team."""
    pass


class TeamResponse(TeamBase):
    """Schema for team response."""
    id: int
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
