from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class NewsBase(BaseModel):
    """Base news schema."""
    title: str
    description: Optional[str] = None


class NewsCreate(NewsBase):
    """Schema for creating news."""
    pass


class NewsResponse(NewsBase):
    """Schema for news response."""
    id: int
    date_created: datetime
    date_updated: Optional[datetime] = None
    status: bool

    class Config:
        from_attributes = True


class OfficialBase(BaseModel):
    """Base official schema."""
    user_name: str
    desigination: Optional[str] = None
    dob: Optional[date] = None
    mobile_no: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    profile_image: Optional[str] = None


class OfficialResponse(OfficialBase):
    """Schema for official response."""
    id: int
    order_by: Optional[int] = None
    status: bool

    class Config:
        from_attributes = True


class SponsorBase(BaseModel):
    """Base sponsor schema."""
    sponser_name: str
    sponser_image: Optional[str] = None
    detail: Optional[str] = None


class SponsorResponse(SponsorBase):
    """Schema for sponsor response."""
    id: int
    order_by: Optional[int] = None
    status: bool

    class Config:
        from_attributes = True


class StandingBase(BaseModel):
    """Base standing schema."""
    year_id: int
    team_id: int
    pool_id: Optional[int] = None
    pool_category_type: Optional[int] = None
    match_played: int = 0
    match_won: int = 0
    match_draw: int = 0
    match_lost: int = 0
    goal_far: int = 0
    goal_aginst: int = 0
    goal_diffrence: int = 0
    points: int = 0
    status_pool_winner: bool = False


class StandingResponse(StandingBase):
    """Schema for standing response."""
    id: int

    class Config:
        from_attributes = True


class SponsorCreate(SponsorBase):
    """Schema for creating sponsor."""
    status: bool = True
    order_by: Optional[int] = 0


class SponsorUpdate(BaseModel):
    """Schema for updating sponsor."""
    sponser_name: Optional[str] = None
    sponser_image: Optional[str] = None
    detail: Optional[str] = None
    status: Optional[bool] = None
    order_by: Optional[int] = None
