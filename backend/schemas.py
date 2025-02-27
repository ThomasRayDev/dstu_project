from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "worker"

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    is_active: bool

class ProjectSchema(BaseModel):
    name: str
    description: str