from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255), nullable=True)
    completed = Column(Boolean, default=False)
