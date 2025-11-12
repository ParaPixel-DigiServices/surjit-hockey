from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models.content import Gallery, Memory
from app.schemas.content import (
    GalleryResponse,
    MemoryResponse,
    MemoryCreate
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


@router.get("/memories", response_model=List[MemoryResponse])
async def get_memories(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get memory posts.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session

    Returns:
        List of memory posts
    """
    memories = db.query(Memory)\
        .filter(Memory.status == True)\
        .order_by(Memory.date_created.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    return memories


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
