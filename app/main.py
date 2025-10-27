import os
from fastapi import *
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from app.db.database import Base, SessionLocal, engine
from app.models.task_model import stats
from app.routes import task_routes
from app.models import *
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from app.routes import task_routes
# Create tables in MySQL automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ToDo List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:3000",
        "http://127.0.0.1:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="todo_db"
)


app.include_router(task_routes.router)

@app.on_event("startup")
def create_initial_stats():
    db = SessionLocal()
    Stats = db.query(stats).first()
    if not Stats:
        Stats = stats(totalTasks=0, modifiedTasks=0, completedTasks=0, deletedTasks=0)
        db.add(Stats)
        db.commit()
    db.close()


@app.get("/")
def root():
    return {"message": "Welcome to the ToDo API!"}
