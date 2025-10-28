## TO-DO List web applicaiton


##Description 
this applicaiton allows users to add edit and drop to-do tasks with simple and user-friendly UI

##Features

##Technologies used

  frontend: React/Nextjs,bootstrap 
  backend:FastAPI(python), sqlAlchemy, mysql(database)

  
###Steps to run the project 

  1-clone the project "gh repo clone abdenourmallem/to-do-web-application-for-smart-drilling       operations".
  2-navigate to the project path using cd command.
  3-Under the project path Start the vertual enviroment (venv)  ".\venv\Scripts\activate".
  4-run the FastApi "uvicorn app.main:app --reload".
  5-run the app "npm run dev".
  6-open the applicaiton in your browser via this link 'http://localhost:3000';









####### the  project structure:
app
|   favico.ico
|   globals.css
|   layout.tsx
|   main.py
|   page.tsx
|
+---components
|       DashBoard.tsx
|       editTaskPage.tsx
|       TaskForm.tsx
|       TaskItem.tsx
|       TaskList.tsx
|       TaskModal.tsx
|
+---db
|   |   database.py
|   |
|   \---__pycache__
|           database.cpython-311.pyc
|
+---models
|   |   task_model.py
|   |
|   \---__pycache__
|           task_model.cpython-311.pyc
|
+---routes
|   |   task_routes.py
|   |
|   \---__pycache__
|           task_routes.cpython-311.pyc
|
+---schemas
|   |   task_schema.py
|   |
|   \---__pycache__
|           task_schema.cpython-311.pyc
|
+---services
|   |   task_service.py
|   |
|   \---__pycache__
|           task_service.cpython-311.pyc
|
\---__pycache__
        main.cpython-311.pyc
