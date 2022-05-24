""" base controller """

from src.util.log import get_logger
from fastapi import FastAPI
from src.controller.routers import price, user, order, portfolio

logger = get_logger()

app = FastAPI(
    title="Trade Orders",
    tags=["api"],
    description="API docs for Project with HTTP REST Endpoints and data models",
    version="1.0.0"
)

app.include_router(price.route)
app.include_router(user.route)
app.include_router(order.route)
app.include_router(portfolio.route)
