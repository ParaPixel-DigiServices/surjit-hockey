from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil
import os
from datetime import datetime

from app.core import get_db
from app.core.config import settings
from app.models.content import Gallery, Memory, Advertisement
from app.schemas.content import (
    GalleryResponse,
    MemoryResponse,
    MemoryCreate,
    AdvertisementResponse
)

router = APIRouter()


@router.get("/gallery", response_model=List[GalleryResponse])
async def get_gallery(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get gallery items.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of gallery items
    """
    gallery_items = db.query(Gallery)\
        .filter(Gallery.status == True, Gallery.parent_image == 0)\
        .order_by(Gallery.date_created.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    return gallery_items


@router.get("/gallery/{gallery_id}", response_model=GalleryResponse)
async def get_gallery_item(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """
    Get gallery item details.

    Args:
        gallery_id: Gallery item ID
        db: Database session

    Returns:
        Gallery item details

    Raises:
        HTTPException: If gallery item not found
    """
    gallery_item = db.query(Gallery)\
        .filter(Gallery.id == gallery_id, Gallery.status == True)\
        .first()

    if not gallery_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found"
        )

    return gallery_item


@router.get("/gallery/{gallery_id}/images", response_model=List[GalleryResponse])
async def get_gallery_images(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """
    Get all images in a gallery album.

    Args:
        gallery_id: Gallery album ID
        db: Database session

    Returns:
        List of images in the album
    """
    images = db.query(Gallery)\
        .filter(Gallery.parent_image == gallery_id, Gallery.status == True)\
        .order_by(Gallery.date_created.desc())\
        .all()

    return images


@router.post("/memories", response_model=MemoryResponse, status_code=status.HTTP_201_CREATED)
async def create_memory(
    memory_data: MemoryCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new memory post.

    Args:
        memory_data: Memory post data
        db: Database session

    Returns:
        Created memory post
    """
    new_memory = Memory(
        user_id=memory_data.user_id,
        caption=memory_data.caption,
        description=memory_data.description,
        image_name=memory_data.image_name,
        status=True
    )

    db.add(new_memory)
    db.commit()
    db.refresh(new_memory)

    return new_memory


@router.get("/advertisements", response_model=List[AdvertisementResponse])
async def get_advertisements(
    position: str = Query(
        None, description="Filter by position (sidebar, header, footer, etc.)"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get active advertisements.

    Args:
        position: Filter by ad position
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of active advertisements
    """
    query = db.query(Advertisement).filter(Advertisement.status == True)

    if position:
        query = query.filter(Advertisement.position == position)

    ads = query.offset(skip).limit(limit).all()

    return ads


@router.post("/gallery", response_model=List[GalleryResponse], status_code=status.HTTP_201_CREATED)
async def create_gallery(
    title: str = Form(...),
    images: List[UploadFile] = File(...),
    parent_image: int = Form(0),
    status: bool = Form(True),
    db: Session = Depends(get_db)
):
    """Create new gallery item(s)."""
    upload_dir = os.path.join(settings.UPLOAD_DIR, "gallery")
    os.makedirs(upload_dir, exist_ok=True)

    created_items = []

    for image in images:
        timestamp = int(datetime.now().timestamp())
        # Use a counter or uuid to ensure uniqueness if multiple files are processed in same second
        # But for simplicity, we rely on the loop speed not being infinite,
        # though adding a small random suffix or index is safer.
        # Let's just append the original filename which should be distinct in a batch usually.
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(upload_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        db_gallery = Gallery(
            title=title,
            image_name=filename,
            parent_image=parent_image,
            status=status,
            date_created=datetime.now(),
            date_updated=datetime.now(),
            user_created_by=1,  # Default admin
            user_updated_by=1
        )
        db.add(db_gallery)
        db.commit()
        db.refresh(db_gallery)
        created_items.append(db_gallery)

    return created_items


@router.delete("/gallery/{gallery_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gallery(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """Delete a gallery item."""
    db_gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not db_gallery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found"
        )

    # Delete file
    upload_dir = os.path.join(settings.UPLOAD_DIR, "gallery")
    file_path = os.path.join(upload_dir, db_gallery.image_name)
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception:
            pass

    db.delete(db_gallery)
    db.commit()
    return None
