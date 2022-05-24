from pydantic import BaseModel

class UserLoginRequest(BaseModel):
    username: str
    password: str

class UserRegisterRequest(BaseModel):
    fullname: str
    username: str
    password: str

class UserLoginResponse(BaseModel):
    status: str
    token: str

class UserRegisterResponse(BaseModel):
    status: str

class UserProfile(BaseModel):
    user_id: str
    user_type: str
    email: str
    user_name: str
    broker: str

class UserProfileResponse(BaseModel):
    status: str
    data: UserProfile
