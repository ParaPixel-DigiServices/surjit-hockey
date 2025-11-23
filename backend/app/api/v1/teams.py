from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil
import os
from datetime import datetime

from app.core import get_db
from app.core.config import settings
from app.models.team import Team, TeamPlayer
from app.schemas.team import TeamResponse, TeamPlayerResponse

router = APIRouter()


@router.post("/", response_model=TeamResponse, status_code=status.HTTP_201_CREATED)
async def create_team(
    team_name: str = Form(...),
    team_name_short: str = Form(...),
    team_type: int = Form(...),
    team_coach: str = Form(""),
    team_manager: str = Form(""),
    team_logo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """Create a new team."""
    logo_filename = ""
    if team_logo:
        upload_dir = os.path.join(settings.UPLOAD_DIR, "teams")
        os.makedirs(upload_dir, exist_ok=True)
        timestamp = int(datetime.now().timestamp())
        logo_filename = f"{timestamp}_{team_logo.filename}"
        file_path = os.path.join(upload_dir, logo_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(team_logo.file, buffer)

    new_team = Team(
        team_name=team_name,
        team_name_short=team_name_short,
        team_type=team_type,
        type=team_type,
        team_coach=team_coach,
        team_manager=team_manager,
        team_logo=logo_filename,
        team_coach_mobile="",
        team_manager_mobile="",
        date_created=str(datetime.now()),
        date_updated=str(datetime.now()),
        user_created=1,
        user_updated=1,
        status=True
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return new_team


@router.put("/{team_id}", response_model=TeamResponse)
async def update_team(
    team_id: int,
    team_name: Optional[str] = Form(None),
    team_name_short: Optional[str] = Form(None),
    team_type: Optional[int] = Form(None),
    team_coach: Optional[str] = Form(None),
    team_manager: Optional[str] = Form(None),
    team_logo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """Update a team."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team_name:
        team.team_name = team_name
    if team_name_short:
        team.team_name_short = team_name_short
    if team_type:
        team.team_type = team_type
        team.type = team_type
    if team_coach:
        team.team_coach = team_coach
    if team_manager:
        team.team_manager = team_manager

    if team_logo:
        upload_dir = os.path.join(settings.UPLOAD_DIR, "teams")
        os.makedirs(upload_dir, exist_ok=True)
        timestamp = int(datetime.now().timestamp())
        logo_filename = f"{timestamp}_{team_logo.filename}"
        file_path = os.path.join(upload_dir, logo_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(team_logo.file, buffer)
        team.team_logo = logo_filename

    team.date_updated = str(datetime.now())
    db.commit()
    db.refresh(team)
    return team


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(team_id: int, db: Session = Depends(get_db)):
    """Delete a team (soft delete)."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    team.status = False
    db.commit()
    return None


@router.get("/", response_model=List[TeamResponse])
async def get_teams(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
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
