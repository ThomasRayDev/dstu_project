from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from models import Project
from schemas import ProjectSchema
from dependencies import get_current_user


router = APIRouter()


@router.get("/")
async def get_projects(decoded_token = Depends(get_current_user), db: Session = Depends(get_db)):
    #пупупуппупу, щас я подумаю, че надо написать, озадачился я...
    user = decoded_token
    db_project = db.query(Project).all()
    return { 
        "user": user,
        "projects": db_project
     }

@router.post("/")
def create_project(project: ProjectSchema, db: Session = Depends(get_db)):
    db_project = Project(name=project.name, description=project.description)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    return db_project