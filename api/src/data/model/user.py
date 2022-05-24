from sqlalchemy import Column, String, Integer

from src.data.model.base import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password_hash = Column(String)
    fullname = Column(String)
