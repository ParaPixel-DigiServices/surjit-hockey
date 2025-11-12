from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date


class TournamentBase(BaseModel):
    """Base tournament schema."""
    event_title: str = Field(..., max_length=300)
    description: Optional[str] = None
    event_image: Optional[str] = None


class TournamentCreate(TournamentBase):
    """Schema for creating a tournament."""
    pass


class TournamentResponse(TournamentBase):
    """Schema for tournament response."""
    id: int
    status: bool
    date_created: datetime
    date_updated: datetime

    class Config:
        from_attributes = True


class FixtureBase(BaseModel):
    """Base fixture schema."""
    year_id: int
    date_match: datetime
    match_name: str
    pool_category_type: int
    match_no: int
    pool_type: int
    team_id_1: int
    team_id_2: int


class FixtureCreate(FixtureBase):
    """Schema for creating a fixture."""
    pass


class FixtureResponse(FixtureBase):
    """Schema for fixture response."""
    id: int
    winner_id: int
    match_status: bool

    class Config:
        from_attributes = True


class MatchResultBase(BaseModel):
    """Base match result schema."""
    fixture_id: int
    team1_score: Optional[int] = None
    team2_score: Optional[int] = None
    winner_team_id: Optional[int] = None
    match_summary: Optional[str] = None


class MatchResultCreate(MatchResultBase):
    """Schema for creating a match result."""
    pass


class MatchResultResponse(MatchResultBase):
    """Schema for match result response."""
    id: int
    date_updated: datetime

    class Config:
        from_attributes = True
