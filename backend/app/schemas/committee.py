from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CoreCommitteeMemberBase(BaseModel):
    name: str
    role: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int = 0


class CoreCommitteeMemberCreate(CoreCommitteeMemberBase):
    pass


class CoreCommitteeMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    display_order: Optional[int] = None


class CoreCommitteeMemberResponse(CoreCommitteeMemberBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DedicatedTeamMemberBase(BaseModel):
    name: str
    role: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int = 0


class DedicatedTeamMemberResponse(DedicatedTeamMemberBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
