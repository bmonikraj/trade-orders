import random
from src.data.schema.order import OrderCreateRequest, OrderCreateResponse, Order as OrderSchema
from src.util.log import get_logger
from fastapi import HTTPException

logger = get_logger()

class OrderService:
    def __init__(self) -> None:
        pass

    @staticmethod
    def place_order(request: OrderCreateRequest) -> OrderCreateResponse:
        try:
            return OrderCreateResponse(
                status="success",
                data=OrderSchema(
                    message="Order placed successfully",
                    order_id=random.randint(100000000000000,999999999999999)
                )
            )
        except Exception as err:
            logger.error(err, exc_info=True)
            raise HTTPException(status_code=500, detail="Error while creating order")

