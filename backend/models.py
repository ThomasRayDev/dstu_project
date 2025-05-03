from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey
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
    created_on = Column(Date, default = datetime.utcnow())
    deadline = Column(Date)
    #progress = Column(int)
    description = Column(String)
    author = Column(Integer, ForeignKey(User.id))
    img = Column(String, default = '/uploads/example.jpg')

    tasks = relationship("Task", back_populates="project")  # Добавлено
    
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    created_on = Column(Date, default = datetime.utcnow())
    deadline = Column(Date)
    status = Column(String, default="pending")
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    project = relationship("Project", back_populates="tasks")
    comments = relationship('Comment', back_populates='task')

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    text = Column(String)
    created_on = Column(DateTime, default = datetime.utcnow())
    author = Column(Integer, ForeignKey(User.id))
    task_id = Column(Integer, ForeignKey(Task.id))

    task = relationship('Task', back_populates='comments')
    user = relationship('User')
