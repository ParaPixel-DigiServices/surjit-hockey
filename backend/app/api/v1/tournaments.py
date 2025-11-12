from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models.tournament import Tournament, Fixture, MatchResult
from app.schemas.tournament import (
    TournamentResponse,
    FixtureResponse,
    MatchResultResponse
)

router = APIRouter()


@router.get("/", response_model=List[TournamentResponse])
async def get_tournaments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get list of all tournaments.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of tournaments
    """
    tournaments = db.query(Tournament)\
        .filter(Tournament.status == True)\
        .order_by(Tournament.date_created.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    return tournaments


@router.get("/{tournament_id}", response_model=TournamentResponse)
async def get_tournament(
    tournament_id: int,
    db: Session = Depends(get_db)
):
    """
    Get tournament details by ID.

    Args:
        tournament_id: Tournament ID
        db: Database session

    Returns:
        Tournament details

    Raises:
        HTTPException: If tournament not found
    """
    tournament = db.query(Tournament)\
        .filter(Tournament.id == tournament_id, Tournament.status == True)\
        .first()

    if not tournament:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tournament not found"
        )

    return tournament


@router.get("/{tournament_id}/fixtures", response_model=List[FixtureResponse])
async def get_tournament_fixtures(
    tournament_id: int,
    db: Session = Depends(get_db)
):
    """
    Get fixtures for a tournament.

    Args:
        tournament_id: Tournament ID (year_id in database)
        db: Database session

    Returns:
        List of fixtures
    """
    fixtures = db.query(Fixture)\
        .filter(Fixture.year_id == tournament_id)\
        .order_by(Fixture.date_match)\
        .all()

    return fixtures


@router.get("/{tournament_id}/results", response_model=List[MatchResultResponse])
async def get_tournament_results(
    tournament_id: int,
    db: Session = Depends(get_db)
):
    """
    Get results for a tournament.

    Args:
        tournament_id: Tournament ID
        db: Database session

    Returns:
        List of match results
    """
    results = db.query(MatchResult)\
        .join(Fixture)\
        .filter(Fixture.tournament_id == tournament_id)\
        .all()

    return results
