from src.data.model.base import session_scope
from src.data.schema.user import UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse, UserProfileResponse, UserProfile
from src.data.model.user import User as UserModel
from src.util.log import get_logger
from src.util.converter import row2dict
from sqlalchemy import and_
import hashlib
from fastapi import HTTPException
import jwt
import os

logger = get_logger()

class UserService:
    def __init__(self) -> None:
        pass

    @staticmethod
    def register(request: UserRegisterRequest) -> UserRegisterResponse:
        try:
            with session_scope() as Session:
                Session.add(UserModel(
                    username=request.username,
                    fullname=request.fullname,
                    password_hash=hashlib.md5(request.password.encode('utf-8')).hexdigest()
                ))
                return UserRegisterResponse(
                    status="success"
                    )
        except Exception as err:
            logger.error(err, exc_info=True)
            raise HTTPException(status_code=500, detail="Error while registring user")
    
    @staticmethod
    def login(request: UserLoginRequest) -> UserLoginResponse:
        try:
            with session_scope() as Session:
                data_ = Session.query(UserModel).filter(
                    and_(
                        UserModel.username == request.username,
                        UserModel.password_hash == hashlib.md5(request.password.encode('utf-8')).hexdigest()
                    )
                ).all()
                if len(data_) == 0:
                    raise HTTPException(status_code=403, detail="User not found")
                return UserLoginResponse(
                    status="success",
                    token=jwt.encode(row2dict(data_[0]), os.environ["SECRET"], algorithm="HS256")
                    )
        except HTTPException as err:
            logger.error(err, exc_info=True)
            raise err
        except Exception as err:
            logger.error(err, exc_info=True)
            raise HTTPException(status_code=500, detail="Error while verifying user")

    @staticmethod
    def profile(data) -> UserProfileResponse:
        try:
            with session_scope() as Session:
                return UserProfileResponse(
                    status="success",
                    data=UserProfile(
                        user_id="{}-{}".format(data["username"],data["fullname"]),
                        user_type="individual",
                        email="{}@gmail.com".format(data["username"]),
                        user_name=data["username"],
                        broker="ZERODHA"
                    )
                )
        except Exception as err:
            logger.error(err, exc_info=True)
            raise HTTPException(status_code=500, detail="Error while fetching profile of user")

