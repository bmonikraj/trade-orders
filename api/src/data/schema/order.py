from pydantic import BaseModel

class OrderCreateRequest(BaseModel):
    symbol: str
    quantity: int
    price: float

class Order(BaseModel):
    message: str
    order_id: int

class OrderCreateResponse(BaseModel):
    status: str
    data: Order