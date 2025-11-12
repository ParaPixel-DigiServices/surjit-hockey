from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.sql import func
from app.core.database import Base


class Banner(Base):
    """Banner/Hero image model."""
    __tablename__ = "hockey_banner"

    id = Column(Integer, primary_key=True, index=True)
    image_name = Column(String(100), nullable=False)
    title_1 = Column(String(250), nullable=False)
    title_2 = Column(String(250), nullable=False)
    title_3 = Column(String(250), nullable=False)
    date_created = Column(DateTime, nullable=False)
    user_created_by = Column(Integer, nullable=False)
    title_status = Column(Boolean, nullable=False)
    status = Column(Boolean, nullable=False)


class Advertisement(Base):
    """Advertisement model."""
    __tablename__ = "hockey_advertisements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    image = Column(String(255), nullable=False)
    link = Column(String(255))
    position = Column(String(50))
    status = Column(Boolean, default=True)


class Gallery(Base):
    """Photo gallery album model."""
    __tablename__ = "hockey_gallery"

    id = Column(Integer, primary_key=True, index=True)
    image_name = Column(String(100), nullable=False)
    title = Column(String(250), nullable=False)
    parent_image = Column(Integer, nullable=False)
    date_created = Column(DateTime, nullable=False)
    date_updated = Column(DateTime, nullable=False)
    user_created_by = Column(Integer, nullable=False)
    user_updated_by = Column(Integer, nullable=False)
    status = Column(Boolean, nullable=False)


class Memory(Base):
    """Memory post model."""
    __tablename__ = "alumni_memory"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    image_name = Column(String(250))
    caption = Column(String(250))
    description = Column(Text)
    date_created = Column(DateTime, server_default=func.now())
    status = Column(Boolean, default=True)
