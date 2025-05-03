from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

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
    img: str
    name: str
    description: str
    created_on: datetime
    deadline: datetime
    img: str

class TaskSchema(BaseModel):
    title: str
    description: str
    created_on: Optional[datetime] = None
    deadline: datetime

class CommentSchema(BaseModel):
    text: str


class UserShort(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True

class CommentOut(BaseModel):
    id: int
    text: str
    created_on: datetime
    user: UserShort

    class Config:
        orm_mode = True

class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    created_on: datetime
    deadline: datetime
    status: str
    project_id: int
    comments: List[CommentOut]

    class Config:
        orm_mode = True
