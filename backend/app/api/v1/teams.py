from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models.team import Team, TeamPlayer
from app.schemas.team import TeamResponse, TeamPlayerResponse

router = APIRouter()


@router.get("/", response_model=List[TeamResponse])
async def get_teams(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get list of all teams.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of teams
    """
    teams = db.query(Team)\
        .filter(Team.status == True)\
        .order_by(Team.team_name)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return teams


@router.get("/{team_id}", response_model=TeamResponse)
async def get_team(
    team_id: int,
    db: Session = Depends(get_db)
):
    """
    Get team details by ID.

    Args:
        team_id: Team ID
        db: Database session

    Returns:
        Team details

    Raises:
        HTTPException: If team not found
    """
    team = db.query(Team)\
        .filter(Team.id == team_id, Team.status == True)\
        .first()

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )

    return team


@router.get("/{team_id}/players", response_model=List[TeamPlayerResponse])
async def get_team_players(
    team_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get all players for a team.

    Args:
        team_id: Team ID
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of players for the team
    """
    # First verify team exists
    team = db.query(Team).filter(
        Team.id == team_id, Team.status == True).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )

    # Get players
    players = db.query(TeamPlayer)\
        .filter(TeamPlayer.team_id == team_id, TeamPlayer.status == True)\
        .order_by(TeamPlayer.jersey_no)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return players
