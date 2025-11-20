from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.core import get_db
from app.models.tournament import Tournament, Fixture, MatchResult
from app.schemas.tournament import (
    TournamentResponse,
    FixtureResponse,
    MatchResultResponse
)

router = APIRouter()


def sanitize_tournament(tournament):
    """Convert tournament model to dict with proper datetime handling."""
    data = {
        "id": tournament.id,
        "event_title": tournament.event_title,
        "description": tournament.description,
        "event_image": tournament.event_image,
        "status": tournament.status,
        "date_created": tournament.date_created,
        "date_updated": None if (isinstance(tournament.date_updated, str) or tournament.date_updated is None) else tournament.date_updated
    }
    return data


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

    return [sanitize_tournament(t) for t in tournaments]


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

    return sanitize_tournament(tournament)


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
    try:
        results = db.query(MatchResult)\
            .join(Fixture, MatchResult.fixture_id == Fixture.id)\
            .filter(Fixture.year_id == tournament_id)\
            .all()
        return results
    except Exception as e:
        # Return empty list if query fails (e.g., no data)
        print(f"Error fetching results: {e}")
        return []



