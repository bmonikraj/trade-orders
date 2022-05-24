""" route for user """

from src.util.log import get_logger
from src.service.user import UserService
from src.data.schema.user import UserRegisterRequest, UserLoginRequest
from fastapi import APIRouter, Header, HTTPException
from typing import Union
from src.util.websecurity import validate

logger = get_logger()

route = APIRouter(
    prefix="/api/user",
    tags=["user"]
)

@route.post("/register")
async def register(request: UserRegisterRequest):
    logger.info(request)
    return UserService.register(request)

@route.post("/login")
async def login(request: UserLoginRequest):
    return UserService.login(request)

@route.get("/profile")
async def get_profile(x_token: Union[str, None] = Header(default=None)):
    is_valid, d_ = validate(x_token)
    if not is_valid:
        raise HTTPException(status_code=403, detail="Invalid user token. Login again.")
    return UserService.profile(d_)
