from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Date
from sqlalchemy.sql import func
from app.core.database import Base


class Tournament(Base):
    """Tournament event model."""
    __tablename__ = "hockey_event_master"

    id = Column(Integer, primary_key=True, index=True)
    event_name = Column(String(255), nullable=False)
    event_year = Column(Integer)
    start_date = Column(Date)
    end_date = Column(Date)
    venue = Column(String(255))
    description = Column(Text)
    status = Column(Boolean, default=True)
    date_created = Column(DateTime, server_default=func.now())


class Fixture(Base):
    """Match fixture model."""
    __tablename__ = "hockey_fixture_master"

    id = Column(Integer, primary_key=True, index=True)
    tournament_id = Column(Integer, index=True)
    match_number = Column(Integer)
    match_date = Column(DateTime)
    team1_id = Column(Integer)
    team2_id = Column(Integer)
    pool = Column(String(50))
    category = Column(String(20))  # Men/Women
    venue = Column(String(255))
    status = Column(String(50))  # scheduled, completed, cancelled


class MatchResult(Base):
    """Match result model."""
    __tablename__ = "hockey_match_results"

    id = Column(Integer, primary_key=True, index=True)
    fixture_id = Column(Integer, index=True)
    team1_score = Column(Integer)
    team2_score = Column(Integer)
    winner_team_id = Column(Integer)
    match_summary = Column(Text)
    date_updated = Column(
        DateTime, server_default=func.now(), onupdate=func.now())


class Category(Base):
    """Tournament category model (Men/Women)."""
    __tablename__ = "hockey_category_master"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(100), nullable=False)
    description = Column(Text)
    status = Column(Boolean, default=True)
