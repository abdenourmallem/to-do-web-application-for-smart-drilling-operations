import os
from fastapi import *
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from app.db.database import Base, engine
from app.routes import task_routes
from app.models import task_model
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

# Create tables in MySQL automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ToDo List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:3000",
        "http://127.0.0.1:3000",],  # frontend origin
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

@app.get("/")
def root():
    return {"message": "Welcome to the ToDo API!"}
