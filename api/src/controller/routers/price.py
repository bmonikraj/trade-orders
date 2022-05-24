""" route for price """

from src.data.schema.price import PriceRequest
from src.service.price import PriceService
from src.util.log import get_logger
from fastapi import APIRouter, Depends

logger = get_logger()

route = APIRouter(
    prefix="/api/price",
    tags=["price"]
)

@route.get("/historical-data")
async def get_prices(request: PriceRequest = Depends()):
    return PriceService.get_prices(request)
