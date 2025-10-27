from sqlalchemy.orm import Session
from app.models.task_model import Task
from app.schemas.task_schema import TaskCreate, TaskUpdate

def get_tasks(db: Session):
    return db.query(Task).all()

def create_task(db: Session, task: TaskCreate):
    new_task = Task(description=task.description,completed=task.completed)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def update_task(db: Session, task_id: int, updated: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        return None
   ## task.title = updated.title
    task.description = updated.description
    task.completed = updated.completed
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task
