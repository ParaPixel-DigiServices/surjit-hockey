from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.sql import func
from app.core.database import Base


class Banner(Base):
    """Banner/Hero image model."""
    __tablename__ = "hockey_banner"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    image = Column(String(255), nullable=False)
    link = Column(String(255))
    order = Column(Integer, default=0)
    status = Column(Boolean, default=True)


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
    __tablename__ = "alumni_gallery"

    id = Column(Integer, primary_key=True, index=True)
    parent_image = Column(Integer, default=0)
    user_id = Column(Integer)
    image_name = Column(String(250))
    caption = Column(String(250))
    description = Column(Text)
    date_created = Column(DateTime, server_default=func.now())
    status = Column(Boolean, default=True)


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
