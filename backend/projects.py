from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from models import Project, Task
from schemas import ProjectSchema
from dependencies import get_current_user
import os
import uuid
from datetime import datetime


router = APIRouter()

# Папка для хранения картинок
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

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

    db_project = Project(img= project.img, name=project.name, deadline=project.deadline, created_on=project.created_on, description=project.description, author=decoded_token['user_id'])
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


@router.post("/{project_id}/upload_image")
async def upload_project_image(
    project_id: int,
    file: UploadFile = File(...),
    decoded_token=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if decoded_token['role'] == 'worker':
        raise HTTPException(status_code=403, detail="Not authorized to upload images")
    
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Сохранение файла
    file_extension = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Обновление пути к картинке в проекте
    db_project.image_path = f"/uploads/{file_name}"
    db.commit()
    db.refresh(db_project)
    
    return {"image_path": db_project.image_path}