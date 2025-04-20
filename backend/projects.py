from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from models import Project
from schemas import ProjectSchema
from dependencies import get_current_user


router = APIRouter()


@router.get("/")
async def get_projects(
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)):

    db_project = db.query(Project).all()
    return { 
        "projects": db_project
     }

@router.get("/{project_id}")
async def get_one_project(
    project_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)):

    db_project = db.query(Project).filter(Project.id == project_id).first()
    return { 
        "project": db_project
     }

@router.post("/")
def create_project(
    project: ProjectSchema,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)):

    db_project = Project(name=project.name, deadline=project.deadline, created_on=project.created_on, description=project.description, author=decoded_token['user_id'])
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    

    return db_project

@router.put("/{project_id}")
async def update_project(
    project_id: int,
    project: ProjectSchema,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)):

    db_project = db.query(Project).filter(Project.id == project_id).first()
    
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    if decoded_token['role'] == 'worker':
        raise HTTPException(status_code=403, detail="Not authorized to edit this project")
        
    db_project.name = project.name
    db_project.deadline = project.deadline
    db_project.description = project.description
    
    db.commit()
    db.refresh(db_project)
    
    return db_project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)):
    
    db_project = db.query(Project).filter(Project.id == project_id).first()

    if not db_project:
        raise HTTPException(status_code=404, detail= "Project not found")
    
    if decoded_token['role'] == 'worker':
        raise HTTPException(status_code=403, detail='Not authorized to delete this project')
    
    db.delete(db_project)
    db.commit()

    return {"detail": 'Project deleted'}
