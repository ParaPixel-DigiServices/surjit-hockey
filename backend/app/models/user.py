from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    """User authentication model."""
    __tablename__ = "alumni_user_register"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    status = Column(Boolean, default=True)
    date_created = Column(DateTime, server_default=func.now())
    date_modified = Column(DateTime, onupdate=func.now())


class UserProfile(Base):
    """User personal details model."""
    __tablename__ = "alumni_user_personal_details"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    date_of_birth = Column(DateTime)
    gender = Column(String(10))
    phone = Column(String(20))
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    country = Column(String(100))
    pincode = Column(String(20))
    nationality_id = Column(Integer)
    profile_image = Column(String(255))


class UserSportsDetails(Base):
    """User sports background model."""
    __tablename__ = "alumni_user_sports_details"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    sports_type = Column(String(100))
    position = Column(String(100))
    team_name = Column(String(200))
    achievements = Column(Text)
    years_active = Column(String(50))
