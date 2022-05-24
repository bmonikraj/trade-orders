from sqlalchemy import Column, String, Numeric, DateTime, Integer

from src.data.model.base import Base


class Price(Base):
    __tablename__ = "price"

    id = Column(Integer, primary_key=True)
    instrument_name = Column(String)
    price = Column(Numeric)
    date = Column(DateTime)
