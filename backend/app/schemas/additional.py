"""Schemas for additional tournament features."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MatchScoringDetailResponse(BaseModel):
    """Match player statistics response."""
    id: int
    year_id: int
    match_id: int
    match_type: int
    team_id: int
    pool_category_type: int
    player_id: int
    green_card: int
    yellow_card: int
    red_card: int
    total_score: int
    fouled_point: int
    status: int

    class Config:
        from_attributes = True


class PoolMasterResponse(BaseModel):
    """Pool master response."""
    id: int
    pool_name: str
    pool_category_type: int
    status: bool

    class Config:
        from_attributes = True


class PoolDetailsResponse(BaseModel):
    """Pool details response."""
    id: int
    year_id: int
    pool_id: int
    pool_category_type: int
    team_id: int
    date_created: datetime
    user_created: str
    status: int

    class Config:
        from_attributes = True


class YearMasterResponse(BaseModel):
    """Year master response."""
    id: int
    year: str
    status: bool

    class Config:
        from_attributes = True


class HonourResponse(BaseModel):
    """Tournament winners response."""
    id: int
    year: int
    team_id_1: int
    team_id_2: int
    team_type: int
    joint_winner: bool

    class Config:
        from_attributes = True


class DedicatedResponse(BaseModel):
    """Dedicated guests/dignitaries response."""
    id: int
    name: str
    designation: str
    city: str
    team_image: str
    status: bool
    order_by: int

    class Config:
        from_attributes = True


class TickerResponse(BaseModel):
    """Ticker response."""
    id: int
    title: str
    description: Optional[str] = None
    date_created: datetime
    status: bool

    class Config:
        from_attributes = True


class ImageOfDayResponse(BaseModel):
    """Image of the day response."""
    id: int
    title: str
    description: Optional[str] = None
    image_name: str
    date_updated: datetime
    user_updated: int
    status: bool

    class Config:
        from_attributes = True


class PositionMasterResponse(BaseModel):
    """Position master response."""
    id: int
    position: str
    status: bool

    class Config:
        from_attributes = True


class MatchReportResponse(BaseModel):
    """Match report response."""
    id: int
    match_id: int
    image_name: str
    caption: Optional[str] = None
    year_id: int

    class Config:
        from_attributes = True


class StreamingResponse(BaseModel):
    """Streaming response."""
    id: int
    url_name: str
    url: str
    embed_code: Optional[str] = None
    date_updated: datetime
    user_updated_by: int

    class Config:
        from_attributes = True


class TimerResponse(BaseModel):
    """Timer response."""
    id: int
    timer_time: str

    class Config:
        from_attributes = True


class CapacityMasterResponse(BaseModel):
    """Capacity master response."""
    id: int
    capacity: str
    status: bool

    class Config:
        from_attributes = True


class LevelMasterResponse(BaseModel):
    """Level master response."""
    id: int
    level: str
    status: bool

    class Config:
        from_attributes = True


class IdentityMasterResponse(BaseModel):
    """Identity master response."""
    id: int
    identity_category_type: int
    name: str
    father_name: Optional[str] = None
    designation: Optional[str] = None
    village: Optional[str] = None
    mobile: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    image: Optional[str] = None
    status: bool

    class Config:
        from_attributes = True


class TeamPlayerScoringDetailResponse(BaseModel):
    """Team player scoring detail response."""
    id: int
    year_id: int
    player_id: int
    match_id: int
    match_score_id: int
    score_type: int
    score: int
    time: int
    date_scored: datetime

    class Config:
        from_attributes = True
