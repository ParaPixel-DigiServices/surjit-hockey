from sqlalchemy import Column, Integer, String, Text, Boolean
from app.core.database import Base


class Team(Base):
    """Team model."""
    __tablename__ = "hockey_team_master"

    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String(250), nullable=False)
    team_name_short = Column(String(50), nullable=False)
    team_logo = Column(String(250), nullable=False)
    team_type = Column(Integer, nullable=False)
    team_coach = Column(String(200), nullable=False)
    team_manager = Column(String(200), nullable=False)
    team_coach_mobile = Column(String(200), nullable=False)
    team_manager_mobile = Column(String(200), nullable=False)
    type = Column(Integer, nullable=False)
    date_created = Column(String(255), nullable=False)
    date_updated = Column(String(255), nullable=False)
    user_created = Column(Integer, nullable=False)
    user_updated = Column(Integer, nullable=False)
    status = Column(Boolean, nullable=False)


class Player(Base):
    """Player/Alumni model."""
    __tablename__ = "hockey_alumni_master"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    team_id = Column(Integer, index=True)
    position = Column(String(100))
    jersey_number = Column(Integer)
    photo = Column(String(255))
    achievements = Column(Text)
    status = Column(Boolean, default=True)
