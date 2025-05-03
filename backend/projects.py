from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from sqlalchemy import asc, desc
from sqlalchemy.orm import Session, joinedload
from database import SessionLocal, get_db
from models import Project, Task, Comment
from schemas import ProjectSchema, TaskSchema, CommentSchema, CommentOut, TaskOut
from dependencies import get_current_user
import os
import uuid
from datetime import datetime
from typing import List


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

    db_project = Project(img=project.img, 
                         name=project.name, 
                         deadline=project.deadline, 
                         created_on=project.created_on, 
                         description=project.description, 
                         author=decoded_token['user_id'])
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
    db_project.img = project.img
    
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
    
    # # Обновление пути к картинке в проекте
    # db_project.image_path = f"/uploads/{file_name}"
    # db.commit()
    # db.refresh(db_project)
    
    return {"image_path": f'/uploads/{file_name}'}

@router.post('/{project_id}/tasks')
def create_task(
    task: TaskSchema,
    project_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(stats_code=404, detail='Project not found')
    
    db_task = Task(title=task.title,
                   description=task.description,
                   created_on=task.created_on,
                   deadline=task.deadline,
                   project_id=project_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return { 'task': db_task }

@router.get('/{project_id}/tasks')
def get_tasks(
    project_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail='Project not found')
    
    sorted_tasks = db.query(Task).filter(Task.project_id == project_id).order_by(desc(Task.created_on)).all()
    return { 'tasks': sorted_tasks }

@router.get('/{project_id}/tasks/{task_id}', response_model=TaskOut)
def get_one_task(
    project_id: int,
    task_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail='Project not found')
    
    db_task = db.query(Task).options(joinedload(Task.comments).joinedload(Comment.user)).filter(Task.id == task_id).first()
    if not db_task or not db_task in db_project.tasks:
        raise HTTPException(status_code=404, detail='Task not found')
    
    return db_task

@router.put('/{project_id}/tasks/{task_id}')
def update_task(
    task: TaskSchema,
    project_id: int,
    task_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail='Project not found')
    
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task or not db_task in db_project.tasks:
        raise HTTPException(status_code=404, detail='Task not found')
    
    db_task.title = task.title
    db_task.description = task.description
    if task.created_on: 
        db_task.created_on = task.created_on
    db_task.deadline = task.deadline

    db.commit()
    db.refresh(db_task)

    return { 'task': db_task }

@router.delete('/{project_id}/tasks/{task_id}')
def delete_task(
    project_id: int,
    task_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail='Project not found')
    
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task or not db_task in db_project.tasks:
        raise HTTPException(status_code=404, detail='Task not found')
    
    db.delete(db_task)
    db.commit()

    return { 'detail': 'Task deleted' }

@router.post('/{project_id}/tasks/{task_id}/comments')
def create_comment(
    comment: CommentSchema,
    project_id: int,
    task_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail='Task not found')
    
    db_comment = Comment(text=comment.text,
                         created_on = datetime.utcnow(),
                         author=decoded_token['user_id'],
                         task_id=task_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)

    return { 'comment': db_comment }

@router.get('/{project_id}/tasks/{task_id}/comments', response_model=List[CommentOut])
def get_comments(
    project_id: int,
    task_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail='Task not found')
    
    return db.query(Comment).filter(Comment.task_id == task_id).all()

@router.get('/{project_id}/tasks/{task_id}/comments/{comment_id}')
def get_one_comment(
    project_id: int,
    task_id: int,
    comment_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail='Task not found')
    
    db_comment = db.query(Comment).filter(Comment.id == comment_id, Comment.task_id == task_id).first()
    if not db_comment:
        raise HTTPException(status_code=404, detail='Comment not found')
    
    return { 'comment': db_comment }

@router.put('/{project_id}/tasks/{task_id}/comments/{comment_id}')
def update_comment(
    comment: CommentSchema,
    project_id: int,
    task_id: int,
    comment_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail='Task not found')
    
    db_comment = db.query(Comment).filter(Comment.id == comment_id, Comment.task_id == task_id).first()
    if not db_comment:
        raise HTTPException(status_code=404, detail='Comment not found')
    
    db_comment.text = comment.text

    db.commit()
    db.refresh(db_comment)

    return { 'comment': db_comment }

@router.delete('/{project_id}/tasks/{task_id}/comments/{comment_id}')
def delete_comment(
    project_id: int,
    task_id: int,
    comment_id: int,
    decoded_token = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail='Task not found')
    
    db_comment = db.query(Comment).filter(Comment.id == comment_id, Comment.task_id == task_id).first()
    if not db_comment:
        raise HTTPException(status_code=404, detail='Comment not found')
    
    db.delete(db_comment)
    db.commit()

    return { 'detail': 'Comment deleted' }
