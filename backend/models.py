from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="worker")  # worker, manager, admin
    projects = relationship("Project")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    created_on = Column(Date, default = datetime.utcnow)
    deadline = Column(Date)
    #progress = Column(int)
    description = Column(String)
    author = Column(Integer, ForeignKey(User.id))