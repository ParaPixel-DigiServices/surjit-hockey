from sqlalchemy import Column, Integer, String, Text, Boolean
from app.core.database import Base


class Team(Base):
    """Team model."""
    __tablename__ = "hockey_teams"

    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String(255), nullable=False)
    team_code = Column(String(50), unique=True)
    logo = Column(String(255))
    description = Column(Text)
    status = Column(Boolean, default=True)


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
