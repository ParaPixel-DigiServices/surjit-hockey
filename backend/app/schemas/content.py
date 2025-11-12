from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class BannerBase(BaseModel):
    """Base banner schema."""
    title: Optional[str] = None
    image: str
    link: Optional[str] = None
    order: Optional[int] = 0


class BannerResponse(BannerBase):
    """Schema for banner response."""
    id: int
    status: bool

    class Config:
        from_attributes = True


class GalleryBase(BaseModel):
    """Base gallery schema."""
    caption: Optional[str] = Field(None, max_length=250)
    description: Optional[str] = None
    image_name: Optional[str] = None


class GalleryCreate(GalleryBase):
    """Schema for creating a gallery item."""
    user_id: int


class GalleryResponse(GalleryBase):
    """Schema for gallery response."""
    id: int
    user_id: int
    parent_image: int
    date_created: datetime
    status: bool

    class Config:
        from_attributes = True


class MemoryBase(BaseModel):
    """Base memory schema."""
    caption: Optional[str] = Field(None, max_length=250)
    description: Optional[str] = None
    image_name: Optional[str] = None


class MemoryCreate(MemoryBase):
    """Schema for creating a memory."""
    user_id: int


class MemoryResponse(MemoryBase):
    """Schema for memory response."""
    id: int
    user_id: int
    date_created: datetime
    status: bool

    class Config:
        from_attributes = True
