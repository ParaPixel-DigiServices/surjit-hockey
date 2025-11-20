"""Additional models for tournament features."""
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, SmallInteger
from app.core.database import Base


class MatchScoringDetail(Base):
    """Match player statistics - goals, cards, fouls."""
    __tablename__ = "hockey_fixture_match_details"

    id = Column(Integer, primary_key=True, index=True)
    year_id = Column(Integer, nullable=False, index=True)
    match_id = Column(Integer, nullable=False, index=True)
    match_type = Column(Integer, nullable=False)
    team_id = Column(Integer, nullable=False)
    pool_category_type = Column(SmallInteger, nullable=False)
    player_id = Column(Integer, nullable=False, index=True)
    green_card = Column(Integer, nullable=False, default=0)
    yellow_card = Column(Integer, nullable=False, default=0)
    red_card = Column(Integer, nullable=False, default=0)
    total_score = Column(Integer, nullable=False, default=0)
    fouled_point = Column(Integer, nullable=False, default=0)
    status = Column(Integer, nullable=False, default=3)


class PoolMaster(Base):
    """Pool/Group master data."""
    __tablename__ = "hockey_pool_master"

    id = Column(Integer, primary_key=True, index=True)
    pool_name = Column(String(100), nullable=False)
    pool_category_type = Column(SmallInteger, nullable=False)
    status = Column(Boolean, nullable=False, default=True)


class PoolDetails(Base):
    """Pool details - which teams in which pools."""
    __tablename__ = "hockey_pool_details"

    id = Column(Integer, primary_key=True, index=True)
    year_id = Column(Integer, nullable=False, index=True)
    pool_id = Column(Integer, nullable=False, index=True)
    pool_category_type = Column(SmallInteger, nullable=False)
    team_id = Column(Integer, nullable=False, index=True)
    date_created = Column(DateTime, nullable=False)
    user_created = Column(String(50), nullable=False)
    status = Column(Integer, nullable=False, default=1)


class YearMaster(Base):
    """Tournament year/edition master."""
    __tablename__ = "hockey_year_master"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String(20), nullable=False)
    status = Column(Boolean, nullable=False, default=True)


class Honour(Base):
    """Tournament Winners/Champions."""
    __tablename__ = "hockey_honour"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer, nullable=False)
    team_id_1 = Column(Integer, nullable=False)
    team_id_2 = Column(Integer, nullable=False)
    team_type = Column(Integer, nullable=False)
    joint_winner = Column(Boolean, nullable=False, default=False)


class Dedicated(Base):
    """Dedicated Guests/Dignitaries."""
    __tablename__ = "hockey_dedicated"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    designation = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    team_image = Column(String(250), nullable=False)
    status = Column(Boolean, nullable=False, default=True)
    order_by = Column(Integer, nullable=False, default=0)


class Ticker(Base):
    """News ticker/breaking news."""
    __tablename__ = "hockey_ticker_master"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    date_created = Column(DateTime, nullable=False)
    status = Column(Boolean, nullable=False, default=True)


class ImageOfDay(Base):
    """Image of the day."""
    __tablename__ = "hockey_image_of_the_day"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    description = Column(Text, nullable=True)
    image_name = Column(String(250), nullable=False)
    date_updated = Column(DateTime, nullable=False)
    user_updated = Column(Integer, nullable=False)
    status = Column(Boolean, nullable=False, default=True)


class PositionMaster(Base):
    """Player positions."""
    __tablename__ = "hockey_position_master"

    id = Column(Integer, primary_key=True, index=True)
    position = Column(String(250), nullable=False)
    status = Column(Boolean, nullable=False, default=True)
