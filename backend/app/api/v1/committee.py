from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models.committee import CoreCommitteeMember, DedicatedTeamMember
from app.schemas.committee import CoreCommitteeMemberResponse, DedicatedTeamMemberResponse

router = APIRouter()


@router.get("/core-committee", response_model=List[CoreCommitteeMemberResponse])
async def get_core_committee_members(db: Session = Depends(get_db)):
    """
    Get all core committee members ordered by display_order.

    Returns:
        List of core committee members
    """
    members = db.query(CoreCommitteeMember)\
        .order_by(CoreCommitteeMember.display_order)\
        .all()

    return members


@router.get("/dedicated-team", response_model=List[DedicatedTeamMemberResponse])
async def get_dedicated_team_members(db: Session = Depends(get_db)):
    """
    Get all dedicated team members ordered by display_order.

    Returns:
        List of dedicated team members
    """
    members = db.query(DedicatedTeamMember)\
        .order_by(DedicatedTeamMember.display_order)\
        .all()

    return members
