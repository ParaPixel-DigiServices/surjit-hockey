from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Date
from sqlalchemy.sql import func
from app.core.database import Base


class Tournament(Base):
    """Tournament event model."""
    __tablename__ = "hockey_event_master"

    id = Column(Integer, primary_key=True, index=True)
    event_title = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    event_image = Column(String(250), nullable=True)
    date_created = Column(DateTime, nullable=False)
    date_updated = Column(DateTime, nullable=False)
    user_created = Column(Integer, nullable=False)
    user_updated = Column(Integer, nullable=False)
    status = Column(Boolean, nullable=False)


class Fixture(Base):
    """Match fixture model."""
    __tablename__ = "hockey_fixture_master"

    id = Column(Integer, primary_key=True, index=True)
    year_id = Column(Integer, nullable=False)
    date_match = Column(DateTime, nullable=False)
    match_name = Column(String(300), nullable=False)
    pool_category_type = Column(Integer, nullable=False)
    match_no = Column(Integer, nullable=False)
    pool_type = Column(Integer, nullable=False)
    team_id_1 = Column(Integer, nullable=False)
    team_id_2 = Column(Integer, nullable=False)
    pool_id_1 = Column(Integer, nullable=False)
    match_id_1 = Column(Integer, nullable=False)
    pool_id_2 = Column(Integer, nullable=False)
    match_id_2 = Column(Integer, nullable=False)
    winner_id = Column(Integer, nullable=False)
    match_status = Column(Boolean, nullable=False)
    match_report_file = Column(String(250), nullable=False)


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
