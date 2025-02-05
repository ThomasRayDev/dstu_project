from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from dependencies import require_role

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.put("/users/{username}/role")
def update_role(username: str, new_role: str, db: Session = Depends(get_db), user: dict = Depends(require_role("admin"))):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.role = new_role
    db.commit()
    return {"message": "Role updated"}
