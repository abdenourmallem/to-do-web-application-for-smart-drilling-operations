from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.task_schema import TaskCreate, TaskUpdate, TaskResponse
from app.services import task_service

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=list[TaskResponse])
def read_tasks(db: Session = Depends(get_db)):
    return task_service.get_tasks(db)

@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    return task_service.create_task(db, task)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, updated: TaskUpdate, db: Session = Depends(get_db)):
    task = task_service.update_task(db, task_id, updated)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = task_service.delete_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
