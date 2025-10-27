from sqlalchemy.orm import Session
from app.models.task_model import Task,stats
from app.schemas.task_schema import TaskCreate, TaskUpdate

def get_tasks(db: Session):
    return db.query(Task).all()
def get_stats(db: Session):
    return db.query(stats).first()
def create_task(db: Session, task: TaskCreate):
    new_task = Task(description=task.description,completed=task.completed)
    db.add(new_task)
    Stats = db.query(stats).first()
    Stats.totalTasks += 1
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
    Stats = db.query(stats).first()
    Stats.modifiedTasks += 1

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        db.delete(task)
        Stats = db.query(stats).first()
        Stats.deletedTasks += 1
        db.commit()
    return task
def delete_multiple_tasks(db: Session, ids: list[int]):
    deleted = db.query(Task).filter(Task.id.in_(ids)).delete(synchronize_session=False)
    db.commit()
    return deleted
