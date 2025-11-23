from fastapi import APIRouter, Depends, HTTPException, status as http_status, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil
import os
from datetime import datetime

from app.core import get_db
from app.core.config import settings
from app.models.news import News, NewsImage, Official, Sponsor, Standing
from app.models.content import Banner
from app.schemas.news import (
    NewsResponse,
    OfficialResponse,
    SponsorResponse,
    StandingResponse,
    NewsUpdate
)
from app.schemas.content import BannerCreate

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
        .filter(News.status.is_(True))\
        .order_by(News.date_created.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    # Sanitize datetime fields and get images
    result = []
    for news in news_list:
        # Fetch image
        image = db.query(NewsImage).filter(NewsImage.news_id ==
                                           news.id, NewsImage.status.is_(True)).first()

        result.append({
            "id": news.id,
            "title": news.title,
            "description": news.description,
            "date_created": news.date_created,
            "date_updated": sanitize_datetime(news, 'date_updated'),
            "status": news.status,
            "news_image": image.news_image if image else None
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
        .filter(News.id == news_id, News.status.is_(True))\
        .first()

    if not news:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )

    # Fetch image
    image = db.query(NewsImage).filter(NewsImage.news_id ==
                                       news.id, NewsImage.status.is_(True)).first()

    return {
        "id": news.id,
        "title": news.title,
        "description": news.description,
        "date_created": news.date_created,
        "date_updated": sanitize_datetime(news, 'date_updated'),
        "status": news.status,
        "news_image": image.news_image if image else None
    }


@router.post("/news", response_model=NewsResponse, status_code=http_status.HTTP_201_CREATED)
async def create_news(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    status: bool = Form(True),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """Create a new news article."""
    # Create news record
    db_news = News(
        title=title,
        description=description,
        status=status,
        date_created=datetime.now(),
        date_updated=datetime.now(),
        user_created=1,  # Default user
        user_updated=1
    )
    db.add(db_news)
    db.commit()
    db.refresh(db_news)

    # Handle image upload
    news_image_name = None
    if image:
        upload_dir = os.path.join(settings.UPLOAD_DIR, "news")
        os.makedirs(upload_dir, exist_ok=True)

        timestamp = int(datetime.now().timestamp())
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(upload_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        news_image_name = filename

        # Create NewsImage record
        db_image = NewsImage(
            news_id=db_news.id,
            news_image=filename,
            status=True
        )
        db.add(db_image)
        db.commit()

    return {
        "id": db_news.id,
        "title": db_news.title,
        "description": db_news.description,
        "date_created": db_news.date_created,
        "date_updated": db_news.date_updated,
        "status": db_news.status,
        "news_image": news_image_name
    }


@router.put("/news/{news_id}", response_model=NewsResponse)
async def update_news(
    news_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    status: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """Update a news article."""
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )

    if title is not None:
        db_news.title = title
    if description is not None:
        db_news.description = description
    if status is not None:
        db_news.status = status

    db_news.date_updated = datetime.now()
    db_news.user_updated = 1

    news_image_name = None

    # Handle image upload
    if image:
        upload_dir = os.path.join(settings.UPLOAD_DIR, "news")
        os.makedirs(upload_dir, exist_ok=True)

        timestamp = int(datetime.now().timestamp())
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(upload_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        news_image_name = filename

        # Check if image exists
        db_image = db.query(NewsImage).filter(
            NewsImage.news_id == news_id).first()
        if db_image:
            # Delete old file if exists
            old_file_path = os.path.join(upload_dir, db_image.news_image)
            if os.path.exists(old_file_path):
                try:
                    os.remove(old_file_path)
                except Exception:
                    pass
            db_image.news_image = filename
            db_image.status = True
        else:
            db_image = NewsImage(
                news_id=news_id,
                news_image=filename,
                status=True
            )
            db.add(db_image)
    else:
        # Get existing image
        db_image = db.query(NewsImage).filter(
            NewsImage.news_id == news_id, NewsImage.status.is_(True)).first()
        if db_image:
            news_image_name = db_image.news_image

    db.commit()
    db.refresh(db_news)

    return {
        "id": db_news.id,
        "title": db_news.title,
        "description": db_news.description,
        "date_created": db_news.date_created,
        "date_updated": db_news.date_updated,
        "status": db_news.status,
        "news_image": news_image_name
    }


@router.delete("/news/{news_id}", status_code=http_status.HTTP_204_NO_CONTENT)
async def delete_news(
    news_id: int,
    db: Session = Depends(get_db)
):
    """Delete a news article."""
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )

    # Delete associated images
    db_images = db.query(NewsImage).filter(NewsImage.news_id == news_id).all()
    upload_dir = os.path.join(settings.UPLOAD_DIR, "news")

    for img in db_images:
        file_path = os.path.join(upload_dir, img.news_image)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                pass
        db.delete(img)

    db.delete(db_news)
    db.commit()
    return None


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
            status_code=http_status.HTTP_404_NOT_FOUND,
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
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Sponsor not found"
        )

    return sponsor


@router.post("/sponsors", response_model=SponsorResponse, status_code=http_status.HTTP_201_CREATED)
async def create_sponsor(
    sponser_name: str = Form(...),
    detail: Optional[str] = Form(None),
    order_by: int = Form(0),
    status: bool = Form(True),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """Create a new sponsor."""
    sponser_image_name = None
    if image:
        upload_dir = os.path.join(settings.UPLOAD_DIR, "sponsors")
        os.makedirs(upload_dir, exist_ok=True)

        timestamp = int(datetime.now().timestamp())
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(upload_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        sponser_image_name = filename

    db_sponsor = Sponsor(
        sponser_name=sponser_name,
        sponser_image=sponser_image_name,
        detail=detail,
        order_by=order_by,
        status=status,
        date_created=datetime.now(),
        date_updated=datetime.now(),
        user_created=1,  # Default user
        user_updated=1
    )
    db.add(db_sponsor)
    db.commit()
    db.refresh(db_sponsor)
    return db_sponsor


@router.put("/sponsors/{sponsor_id}", response_model=SponsorResponse)
async def update_sponsor(
    sponsor_id: int,
    sponser_name: Optional[str] = Form(None),
    detail: Optional[str] = Form(None),
    order_by: Optional[int] = Form(None),
    status: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """Update a sponsor."""
    db_sponsor = db.query(Sponsor).filter(Sponsor.id == sponsor_id).first()
    if not db_sponsor:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Sponsor not found"
        )

    if sponser_name is not None:
        db_sponsor.sponser_name = sponser_name
    if detail is not None:
        db_sponsor.detail = detail
    if order_by is not None:
        db_sponsor.order_by = order_by
    if status is not None:
        db_sponsor.status = status

    if image:
        upload_dir = os.path.join(settings.UPLOAD_DIR, "sponsors")
        os.makedirs(upload_dir, exist_ok=True)

        timestamp = int(datetime.now().timestamp())
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(upload_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        db_sponsor.sponser_image = filename

    db_sponsor.date_updated = datetime.now()
    db_sponsor.user_updated = 1  # Default user

    db.commit()
    db.refresh(db_sponsor)
    return db_sponsor


@router.delete("/sponsors/{sponsor_id}", status_code=http_status.HTTP_204_NO_CONTENT)
async def delete_sponsor(
    sponsor_id: int,
    db: Session = Depends(get_db)
):
    """Delete a sponsor."""
    db_sponsor = db.query(Sponsor).filter(Sponsor.id == sponsor_id).first()
    if not db_sponsor:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Sponsor not found"
        )

    db.delete(db_sponsor)
    db.commit()
    return None


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


@router.post("/banners", response_model=dict)
async def create_banner(
    title_1: str = Form(...),
    title_2: Optional[str] = Form(None),
    title_3: Optional[str] = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Create a new banner.

    Args:
        title_1: Main title
        title_2: Subtitle 1
        title_3: Subtitle 2
        image: Banner image file
        db: Database session

    Returns:
        Created banner details
    """
    # Save image
    upload_dir = os.path.join(settings.UPLOAD_DIR, "banners")
    os.makedirs(upload_dir, exist_ok=True)

    # Generate unique filename
    timestamp = int(datetime.now().timestamp())
    filename = f"{timestamp}_{image.filename}"
    file_path = os.path.join(upload_dir, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Create banner record
    new_banner = Banner(
        image_name=filename,
        title_1=title_1,
        title_2=title_2 or "",
        title_3=title_3 or "",
        title_status=True,
        status=True,
        date_created=datetime.now(),
        user_created_by=1  # Default admin user
    )

    db.add(new_banner)
    db.commit()
    db.refresh(new_banner)

    return {
        "id": new_banner.id,
        "image_name": new_banner.image_name,
        "title_1": new_banner.title_1,
        "title_2": new_banner.title_2,
        "title_3": new_banner.title_3,
        "status": new_banner.status
    }


@router.delete("/banners/{banner_id}")
async def delete_banner(
    banner_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a banner.

    Args:
        banner_id: Banner ID
        db: Database session

    Returns:
        Success message
    """
    banner = db.query(Banner).filter(Banner.id == banner_id).first()

    if not banner:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Banner not found"
        )

    # Delete image file
    if banner.image_name:
        file_path = os.path.join(
            settings.UPLOAD_DIR, "banners", banner.image_name)
        if os.path.exists(file_path):
            os.remove(file_path)

    db.delete(banner)
    db.commit()

    return {"message": "Banner deleted successfully"}
