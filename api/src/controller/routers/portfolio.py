from src.util.log import get_logger
from fastapi import APIRouter, Header, HTTPException
from src.service.portfolio import PortfolioService
from typing import Union
from src.util.websecurity import validate

logger = get_logger()

route = APIRouter(
    prefix="/api/portfolio",
    tags=["portfolio"]
)

@route.get("/holdings")
async def holdings(x_token: Union[str, None] = Header(default=None)):
    is_valid, d_ = validate(x_token)
    if not is_valid:
        raise HTTPException(status_code=403, detail="Invalid user token. Login again.")
    return PortfolioService.holdings(d_)
