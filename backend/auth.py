from fastapi import APIRouter, Depends, HTTPException, status, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from models import User
from schemas import UserCreate, UserLogin
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from dependencies import get_current_user

SECRET_KEY = "secret_key_example"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 99999

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()
security = HTTPBearer()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=555555))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": str(db_user.id), "role": db_user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/current-user")
def return_current_user(decoded_token = Depends(get_current_user), db: Session = Depends(get_db)):
    user_id = int(decoded_token['user_id'])
    user = db.query(User).filter(User.id == user_id).first()
    return {
        'user_id': user.id,
        'username': user.username,
        'role': user.role,
    }
