import datetime
from typing import List
from pydantic import BaseModel

class PriceRequest(BaseModel):
    symbol: str
    from_date: datetime.date
    to_date: datetime.date

class Price(BaseModel):
    price: float
    date: datetime.datetime

class PriceResponse(BaseModel):
    status: str
    symbol: str
    data: List[Price]