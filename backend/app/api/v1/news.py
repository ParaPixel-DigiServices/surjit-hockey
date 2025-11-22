from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models.news import News, Official, Sponsor, Standing
from app.schemas.news import (
    NewsResponse,
    OfficialResponse,
    SponsorResponse,
    StandingResponse
)

router = APIRouter()


def sanitize_datetime(obj, date_field):
    """Helper to handle invalid datetime fields."""
    date_val = getattr(obj, date_field, None)
    if isinstance(date_val, str) or date_val is None:
        return None
    return date_val


@router.get("/news", response_model=List[NewsResponse])
async def get_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get list of all news articles.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of news articles
    """
    news_list = db.query(News)\
        .filter(News.status == True)\
        .order_by(News.date_created.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    # Sanitize datetime fields
    result = []
    for news in news_list:
        result.append({
            "id": news.id,
            "title": news.title,
            "description": news.description,
            "date_created": news.date_created,
            "date_updated": sanitize_datetime(news, 'date_updated'),
            "status": news.status
        })

    return result


@router.get("/news/{news_id}", response_model=NewsResponse)
async def get_news_by_id(
    news_id: int,
    db: Session = Depends(get_db)
):
    """
    Get news article by ID.

    Args:
        news_id: News ID
        db: Database session

    Returns:
        News article details

    Raises:
        HTTPException: If news not found
    """
    news = db.query(News)\
        .filter(News.id == news_id, News.status == True)\
        .first()

    if not news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )

    return {
        "id": news.id,
        "title": news.title,
        "description": news.description,
        "date_created": news.date_created,
        "date_updated": sanitize_datetime(news, 'date_updated'),
        "status": news.status
    }


@router.get("/officials", response_model=List[OfficialResponse])
async def get_officials(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """
    Get list of all hockey officials.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of officials
    """
    officials = db.query(Official)\
        .filter(Official.status == True)\
        .order_by(Official.order_by)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return officials


@router.get("/officials/{official_id}", response_model=OfficialResponse)
async def get_official_by_id(
    official_id: int,
    db: Session = Depends(get_db)
):
    """
    Get official by ID.

    Args:
        official_id: Official ID
        db: Database session

    Returns:
        Official details

    Raises:
        HTTPException: If official not found
    """
    official = db.query(Official)\
        .filter(Official.id == official_id, Official.status == True)\
        .first()

    if not official:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Official not found"
        )

    return official


@router.get("/sponsors", response_model=List[SponsorResponse])
async def get_sponsors(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """
    Get list of all sponsors.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of sponsors
    """
    sponsors = db.query(Sponsor)\
        .filter(Sponsor.status == True)\
        .order_by(Sponsor.order_by)\
        .offset(skip)\
        .limit(limit)\
        .all()

    return sponsors


@router.get("/sponsors/{sponsor_id}", response_model=SponsorResponse)
async def get_sponsor_by_id(
    sponsor_id: int,
    db: Session = Depends(get_db)
):
    """
    Get sponsor by ID.

    Args:
        sponsor_id: Sponsor ID
        db: Database session

    Returns:
        Sponsor details

    Raises:
        HTTPException: If sponsor not found
    """
    sponsor = db.query(Sponsor)\
        .filter(Sponsor.id == sponsor_id, Sponsor.status == True)\
        .first()

    if not sponsor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sponsor not found"
        )

    return sponsor


@router.get("/standings/{year_id}", response_model=List[StandingResponse])
async def get_standings_by_year(
    year_id: int,
    pool_id: int = Query(None, description="Filter by pool ID"),
    pool_category_type: int = Query(
        None, description="Filter by pool category type"),
    db: Session = Depends(get_db)
):
    """
    Get standings/points table for a tournament year.

    Args:
        year_id: Tournament year ID
        pool_id: Optional pool ID filter
        pool_category_type: Optional pool category filter
        db: Database session

    Returns:
        List of standings
    """
    query = db.query(Standing)\
        .filter(Standing.year_id == year_id)

    if pool_id is not None:
        query = query.filter(Standing.pool_id == pool_id)

    if pool_category_type is not None:
        query = query.filter(Standing.pool_category_type == pool_category_type)

    standings = query.order_by(Standing.points.desc()).all()

    return standings


@router.get("/banners/active", response_model=List[dict])
async def get_active_banners(
    db: Session = Depends(get_db)
):
    """
    Get active banners for homepage.

    Returns:
        List of active banners
    """
    from app.models.content import Banner

    banners = db.query(Banner)\
        .filter(Banner.status == True)\
        .all()

    result = []
    for banner in banners:
        result.append({
            "id": banner.id,
            "image_name": banner.image_name,
            "title_1": banner.title_1,
            "title_2": banner.title_2,
            "title_3": banner.title_3,
            "title_status": banner.title_status,
            "status": banner.status
        })

    return result
