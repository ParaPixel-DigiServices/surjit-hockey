"""Additional API endpoints for tournament features."""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models.additional import (
    MatchScoringDetail, PoolMaster, PoolDetails, YearMaster,
    Honour, Dedicated, Ticker, ImageOfDay, PositionMaster,
    MatchReport, Streaming, Timer, CapacityMaster, LevelMaster,
    IdentityMaster, TeamPlayerScoringDetail
)
from app.schemas.additional import (
    MatchScoringDetailResponse, PoolMasterResponse, PoolDetailsResponse,
    YearMasterResponse, HonourResponse, DedicatedResponse, TickerResponse,
    ImageOfDayResponse, PositionMasterResponse, MatchReportResponse,
    StreamingResponse, TimerResponse, CapacityMasterResponse, LevelMasterResponse,
    IdentityMasterResponse, TeamPlayerScoringDetailResponse
)

router = APIRouter()


# ===== MATCH SCORING DETAILS =====
@router.get("/matches/{match_id}/scoring", response_model=List[MatchScoringDetailResponse])
async def get_match_scoring_details(
    match_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get player statistics for a specific match (goals, cards, fouls).

    Args:
        match_id: Match ID
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of player statistics for the match
    """
    scoring_details = db.query(MatchScoringDetail)\
        .filter(MatchScoringDetail.match_id == match_id)\
        .order_by(MatchScoringDetail.player_id)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return scoring_details


# ===== POOL/GROUP INFORMATION =====
@router.get("/pools", response_model=List[PoolMasterResponse])
async def get_pools(
    db: Session = Depends(get_db)
):
    """
    Get list of all pools/groups.

    Returns:
        List of pools
    """
    pools = db.query(PoolMaster)\
        .filter(PoolMaster.status == True)\
        .order_by(PoolMaster.pool_name)\
        .all()

    return pools


@router.get("/pools/{year_id}/teams", response_model=List[PoolDetailsResponse])
async def get_pool_teams(
    year_id: int,
    pool_id: int = Query(None),
    db: Session = Depends(get_db)
):
    """
    Get pool details - which teams are in which pools for a year.

    Args:
        year_id: Tournament year ID
        pool_id: Optional pool ID to filter
        db: Database session

    Returns:
        List of pool details
    """
    query = db.query(PoolDetails)\
        .filter(PoolDetails.year_id == year_id, PoolDetails.status == 1)

    if pool_id is not None:
        query = query.filter(PoolDetails.pool_id == pool_id)

    pool_details = query.order_by(
        PoolDetails.pool_id, PoolDetails.team_id).all()

    return pool_details


# ===== TOURNAMENT YEARS =====
@router.get("/years", response_model=List[YearMasterResponse])
async def get_tournament_years(
    db: Session = Depends(get_db)
):
    """
    Get list of all tournament years/editions.

    Returns:
        List of tournament years
    """
    years = db.query(YearMaster)\
        .filter(YearMaster.status == True)\
        .order_by(YearMaster.year.desc())\
        .all()

    return years


# ===== HALL OF HONOUR =====
@router.get("/honours", response_model=List[HonourResponse])
async def get_honours(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get tournament winners/champions by year.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of tournament winners
    """
    honours = db.query(Honour)\
        .order_by(Honour.year.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    return honours


@router.get("/honours/{year}", response_model=List[HonourResponse])
async def get_honours_by_year(
    year: int,
    db: Session = Depends(get_db)
):
    """
    Get tournament winners for a specific year.

    Args:
        year: Tournament year
        db: Database session

    Returns:
        List of winners for that year
    """
    honours = db.query(Honour)\
        .filter(Honour.year == year)\
        .all()

    if not honours:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No winners found for year {year}"
        )

    return honours


# ===== DEDICATED/TRIBUTE SECTION =====
@router.get("/dedicated", response_model=List[DedicatedResponse])
async def get_dedicated(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get dedicated guests/dignitaries.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of dedicated guests
    """
    dedicated = db.query(Dedicated)\
        .filter(Dedicated.status == True)\
        .order_by(Dedicated.order_by, Dedicated.name)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return dedicated


# ===== NEWS TICKER =====
@router.get("/ticker", response_model=List[TickerResponse])
async def get_ticker(
    db: Session = Depends(get_db)
):
    """
    Get active news ticker items.

    Returns:
        List of active ticker items
    """
    ticker_items = db.query(Ticker)\
        .filter(Ticker.status == True)\
        .order_by(Ticker.date_created.desc())\
        .limit(10)\
        .all()

    return ticker_items


# ===== IMAGE OF THE DAY =====
@router.get("/image-of-day", response_model=ImageOfDayResponse)
async def get_image_of_day(
    db: Session = Depends(get_db)
):
    """
    Get current image of the day.

    Returns:
        Image of the day
    """
    image = db.query(ImageOfDay)\
        .filter(ImageOfDay.status == True)\
        .order_by(ImageOfDay.date_updated.desc())\
        .first()

    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No image of the day found"
        )

    return image


# ===== PLAYER POSITIONS =====
@router.get("/positions", response_model=List[PositionMasterResponse])
async def get_positions(
    db: Session = Depends(get_db)
):
    """
    Get list of all player positions.

    Returns:
        List of positions
    """
    positions = db.query(PositionMaster)\
        .filter(PositionMaster.status == True)\
        .order_by(PositionMaster.position)\
        .all()

    return positions


# ===== MATCH REPORTS =====
@router.get("/matches/{match_id}/reports", response_model=List[MatchReportResponse])
async def get_match_reports(
    match_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get match report images for a specific match.

    Args:
        match_id: Match ID
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of match report images
    """
    reports = db.query(MatchReport)\
        .filter(MatchReport.match_id == match_id)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return reports


# ===== LIVE STREAMING =====
@router.get("/streaming", response_model=StreamingResponse)
async def get_streaming(
    db: Session = Depends(get_db)
):
    """
    Get current live streaming link.

    Returns:
        Live streaming information
    """
    streaming = db.query(Streaming)\
        .order_by(Streaming.date_updated.desc())\
        .first()

    if not streaming:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No streaming link found"
        )

    return streaming


# ===== TOURNAMENT TIMER =====
@router.get("/timer", response_model=TimerResponse)
async def get_timer(
    db: Session = Depends(get_db)
):
    """
    Get tournament countdown timer.

    Returns:
        Timer information
    """
    timer = db.query(Timer).first()

    if not timer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No timer found"
        )

    return timer


# ===== CAPACITY MASTER =====
@router.get("/capacities", response_model=List[CapacityMasterResponse])
async def get_capacities(
    db: Session = Depends(get_db)
):
    """
    Get list of player capacities.

    Returns:
        List of capacities
    """
    capacities = db.query(CapacityMaster)\
        .filter(CapacityMaster.status == True)\
        .order_by(CapacityMaster.capacity)\
        .all()

    return capacities


# ===== LEVEL MASTER =====
@router.get("/levels", response_model=List[LevelMasterResponse])
async def get_levels(
    db: Session = Depends(get_db)
):
    """
    Get list of tournament levels.

    Returns:
        List of levels
    """
    levels = db.query(LevelMaster)\
        .filter(LevelMaster.status == True)\
        .order_by(LevelMaster.level)\
        .all()

    return levels


# ===== IDENTITY MASTER =====
@router.get("/identities", response_model=List[IdentityMasterResponse])
async def get_identities(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get list of identity records.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of identity records
    """
    identities = db.query(IdentityMaster)\
        .filter(IdentityMaster.status == True)\
        .order_by(IdentityMaster.name)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return identities


# ===== TEAM PLAYER SCORING DETAILS =====
@router.get("/matches/{match_id}/goals", response_model=List[TeamPlayerScoringDetailResponse])
async def get_match_goals(
    match_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get goal scoring details with timing for a specific match.

    Args:
        match_id: Match ID
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of goal scoring details with player IDs and timing
    """
    goals = db.query(TeamPlayerScoringDetail)\
        .filter(TeamPlayerScoringDetail.match_id == match_id)\
        .order_by(TeamPlayerScoringDetail.time)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return goals
