from pydantic import BaseModel

class TaskBase(BaseModel):
    description: str | None = None
    completed: bool = False
class statsBase(BaseModel):
    totalTasks: int=0
    modifiedTasks: int = 0
    completedTasks: int = 0
    deletedTasks: int = 0
class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int

    class Config:
        orm_mode = True
