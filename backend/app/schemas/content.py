from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class BannerBase(BaseModel):
    """Base banner schema."""
    image_name: str
    title_1: str
    title_2: Optional[str] = None
    title_3: Optional[str] = None


class BannerResponse(BannerBase):
    """Schema for banner response."""
    id: int
    title_status: bool
    status: bool
    date_created: datetime

    class Config:
        from_attributes = True


class AdvertisementResponse(BaseModel):
    """Schema for advertisement response."""
    id: int
    title: Optional[str] = None
    image: str
    link: Optional[str] = None
    position: Optional[str] = None
    status: bool

    class Config:
        from_attributes = True


class GalleryBase(BaseModel):
    """Base gallery schema."""
    image_name: str
    title: str


class GalleryCreate(GalleryBase):
    """Schema for creating a gallery item."""
    pass


class GalleryResponse(GalleryBase):
    """Schema for gallery response."""
    id: int
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
