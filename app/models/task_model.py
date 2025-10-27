from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255), nullable=True)
    completed = Column(Boolean, default=False)
class stats(Base):
    __tablename__ = "stats"
    id = Column(Integer, primary_key=True, index=True)
    totalTasks = Column(Integer, default=0)
    modifiedTasks = Column(Integer, default=0)
    completedTasks=Column(Integer, default=0)
    deletedTasks = Column(Integer, default=0)