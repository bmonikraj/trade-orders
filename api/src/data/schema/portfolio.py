import datetime
from typing import List
from pydantic import BaseModel

class Portfolio(BaseModel):
    tradingsymbol: str
    exchange: str
    isin: str
    quantity: int
    authorised_date: datetime.datetime
    average_price: float
    last_price: float
    close_price: float
    pnl: float
    day_change: float
    day_change_percentage: float

class PortfolioResponse(BaseModel):
    status: str
    data: List[Portfolio]