from src.util.log import get_logger
from fastapi import APIRouter, Header, HTTPException
from src.data.schema.order import OrderCreateRequest
from src.service.order import OrderService
from typing import Union
from src.util.websecurity import validate

logger = get_logger()

route = APIRouter(
    prefix="/api/order",
    tags=["order"]
)

@route.post("/place-order")
async def place_order(request: OrderCreateRequest, x_token: Union[str, None] = Header(default=None)):
    is_valid, d_ = validate(x_token)
    if not is_valid:
        raise HTTPException(status_code=403, detail="Invalid user token. Login again.")
    return OrderService.place_order(request)
