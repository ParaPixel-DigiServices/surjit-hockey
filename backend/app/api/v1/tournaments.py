from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

from app.core import get_db
from app.models.tournament import Tournament, Fixture, MatchResult, Category
from app.schemas.tournament import (
    TournamentResponse,
    FixtureResponse,
    MatchResultResponse,
    CategoryResponse,
    FixtureCreate
)

router = APIRouter()


class FixtureUpdate(BaseModel):
    date_match: Optional[datetime] = None
    match_name: Optional[str] = None
    pool_category_type: Optional[int] = None
    match_no: Optional[int] = None
    pool_type: Optional[int] = None
    team_id_1: Optional[int] = None
    team_id_2: Optional[int] = None
    match_status: Optional[bool] = None


class MatchResultCreate(BaseModel):
    fixture_id: int
    team1_score: int
    team2_score: int
    match_summary: Optional[str] = None


class MatchResultUpdate(BaseModel):
    team1_score: Optional[int] = None
    team2_score: Optional[int] = None
    match_summary: Optional[str] = None


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


@router.get("/categories/all", response_model=List[CategoryResponse])
async def get_categories(
    db: Session = Depends(get_db)
):
    """
    Get tournament categories (Men/Women).

    Args:
        db: Database session

    Returns:
        List of active categories
    """
    categories = db.query(Category)\
        .filter(Category.status == True)\
        .all()

    return categories


@router.post("/fixtures", response_model=FixtureResponse, status_code=status.HTTP_201_CREATED)
async def create_fixture(
    fixture: FixtureCreate,
    db: Session = Depends(get_db)
):
    """Create a new fixture."""
    new_fixture = Fixture(
        **fixture.dict(),
        pool_id_1=0, match_id_1=0, pool_id_2=0, match_id_2=0,
        winner_id=0, match_status=False, match_report_file=""
    )
    db.add(new_fixture)
    db.commit()
    db.refresh(new_fixture)
    return new_fixture


@router.put("/fixtures/{fixture_id}", response_model=FixtureResponse)
async def update_fixture(
    fixture_id: int,
    fixture: FixtureUpdate,
    db: Session = Depends(get_db)
):
    """Update a fixture."""
    db_fixture = db.query(Fixture).filter(Fixture.id == fixture_id).first()
    if not db_fixture:
        raise HTTPException(status_code=404, detail="Fixture not found")

    update_data = fixture.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_fixture, key, value)

    db.commit()
    db.refresh(db_fixture)
    return db_fixture


@router.delete("/fixtures/{fixture_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_fixture(
    fixture_id: int,
    db: Session = Depends(get_db)
):
    """Delete a fixture."""
    db_fixture = db.query(Fixture).filter(Fixture.id == fixture_id).first()
    if not db_fixture:
        raise HTTPException(status_code=404, detail="Fixture not found")

    db.delete(db_fixture)
    db.commit()
    return None


@router.post("/results", response_model=MatchResultResponse, status_code=status.HTTP_201_CREATED)
async def create_result(
    result: MatchResultCreate,
    db: Session = Depends(get_db)
):
    """Create a match result."""
    new_result = MatchResult(**result.dict())
    db.add(new_result)
    db.commit()
    db.refresh(new_result)
    return new_result


@router.put("/results/{result_id}", response_model=MatchResultResponse)
async def update_result(
    result_id: int,
    result: MatchResultUpdate,
    db: Session = Depends(get_db)
):
    """Update a match result."""
    db_result = db.query(MatchResult).filter(
        MatchResult.id == result_id).first()
    if not db_result:
        raise HTTPException(status_code=404, detail="Result not found")

    update_data = result.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_result, key, value)

    db.commit()
    db.refresh(db_result)
    return db_result


@router.delete("/results/{result_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_result(
    result_id: int,
    db: Session = Depends(get_db)
):
    """Delete a match result."""
    db_result = db.query(MatchResult).filter(
        MatchResult.id == result_id).first()
    if not db_result:
        raise HTTPException(status_code=404, detail="Result not found")

    db.delete(db_result)
    db.commit()
    return None
