from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Date
from app.core.database import Base


class News(Base):
    """News article model."""
    __tablename__ = "hockey_news_master"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    description = Column(Text, nullable=True)
    date_created = Column(DateTime, nullable=False)
    date_updated = Column(DateTime, nullable=True)
    user_created = Column(Integer, nullable=False)
    user_updated = Column(Integer, nullable=True)
    status = Column(Boolean, nullable=False)


class NewsImage(Base):
    """News image model."""
    __tablename__ = "hockey_news_images"

    id = Column(Integer, primary_key=True, index=True)
    news_id = Column(Integer, index=True, nullable=False)
    image_name = Column(String(250), nullable=False)
    status = Column(Boolean, default=True)


class Official(Base):
    """Hockey official model."""
    __tablename__ = "hockey_officials"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(100), nullable=False)
    desigination = Column(String(100), nullable=True)
    dob = Column(Date, nullable=True)
    mobile_no = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    email = Column(String(150), nullable=True)
    profile_image = Column(String(250), nullable=True)
    date_created = Column(DateTime, nullable=True)
    date_updated = Column(DateTime, nullable=True)
    created_by = Column(Integer, nullable=True)
    updated_by = Column(Integer, nullable=True)
    order_by = Column(Integer, nullable=True)
    status = Column(Boolean, nullable=False)


class Sponsor(Base):
    """Sponsor model."""
    __tablename__ = "hockey_sponser_master"

    id = Column(Integer, primary_key=True, index=True)
    sponser_name = Column(String(250), nullable=False)
    sponser_image = Column(String(250), nullable=True)
    detail = Column(Text, nullable=True)
    order_by = Column(Integer, nullable=True)
    date_created = Column(DateTime, nullable=True)
    date_updated = Column(DateTime, nullable=True)
    user_created = Column(Integer, nullable=True)
    user_updated = Column(Integer, nullable=True)
    status = Column(Boolean, nullable=False)


class Standing(Base):
    """Tournament standings/points table model."""
    __tablename__ = "hockey_standing_master"

    id = Column(Integer, primary_key=True, index=True)
    year_id = Column(Integer, index=True, nullable=False)
    pool_id = Column(Integer, nullable=True)
    pool_category_type = Column(Integer, nullable=True)
    team_id = Column(Integer, index=True, nullable=False)
    match_played = Column(Integer, default=0)
    match_won = Column(Integer, default=0)
    match_draw = Column(Integer, default=0)
    match_lost = Column(Integer, default=0)
    goal_far = Column(Integer, default=0)
    goal_aginst = Column(Integer, default=0)
    goal_diffrence = Column(Integer, default=0)
    points = Column(Integer, default=0)
    status_pool_winner = Column(Boolean, default=False)
