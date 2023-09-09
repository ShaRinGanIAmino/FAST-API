from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session 
from datetime import datetime, date 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(bind=engine)

class TodoBase(BaseModel):
    id : int
    content : str
    limit  : date 
    
    
def get_db(): 
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session,Depends(get_db)]


@app.get("/")
async def root():
    return {"message": "Hello World"}



# Get all todos
@app.get("/todos",status_code=status.HTTP_200_OK)
async def get_todos( db : db_dependency ):
    todos = db.query(models.Todo).all()
    return {"todos": todos }

# Get single todo
@app.get("/todos/{todo_id}",status_code=status.HTTP_200_OK)
async def get_todo(todo_id : int , db : db_dependency):
   todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
   if todo is None:
       raise HTTPException(status_code=404, detail = 'Todo not found')
   return todo
    

# Create a todo 
@app.post("/todo", status_code=status.HTTP_201_CREATED)
async def create_todos(todo : TodoBase , db:db_dependency):
    db_todo = models.Todo(**todo.dict())
    db.add(db_todo)
    db.commit()
    return {"message": "Todo created succesfully"}
    

# Update a todo 
@app.patch("/todos/{todo_id}", status_code=status.HTTP_200_OK)
async def update_todo(todo_id : int , db : db_dependency , new_todo : TodoBase ):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo is None:
       raise HTTPException(status_code=404, detail = 'Todo not found')
    todo.content = new_todo.content
    todo.limit = new_todo.limit
    db.commit()
    return {"message": "Todo updated succesfully"} 

# Delete a todo 
@app.delete("/todos/{todo_id}", status_code=status.HTTP_200_OK)
async def delete_todo(todo_id : int , db : db_dependency):
  deleted_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first() 
  if deleted_todo is None:
       raise HTTPException(status_code=404, detail = 'Todo not found')
  db.delete(deleted_todo)
  db.commit()
  return {"message": "Todo deleted succesfully"}
   
