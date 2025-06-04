from typing import List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import create_db_and_tables, get_session
from models import Task
from schemas import TaskCreate, TaskRead, TaskUpdate

app = FastAPI(
    title="ToDo Manager",
    description="Минималистичный ToDo API на FastAPI + SQLModel",
    version="0.1",
)


app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173"],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    """Создаём БД при запуске."""
    create_db_and_tables()


@app.post("/tasks/", response_model=TaskRead)
def create_task(task: TaskCreate, session: Session = Depends(get_session)):
    """
    Создаёт новую задачу.
    """
    db_task = Task(**task.dict())
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.get("/tasks/", response_model=List[TaskRead])
def read_tasks(session: Session = Depends(get_session)):
    """
    Получает список всех задач.
    """
    tasks = session.exec(select(Task)).all()
    return tasks


@app.get("/tasks/{task_id}", response_model=TaskRead)
def read_task(task_id: int, session: Session = Depends(get_session)):
    """
    Получает одну задачу по id.
    """
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.patch("/tasks/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_update: TaskUpdate, session: Session = Depends(get_session)):
    """
    Обновляет задачу (только переданные поля).
    """
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task_update.dict(exclude_unset=True).items():
        setattr(db_task, key, value)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}", response_model=dict)
def delete_task(task_id: int, session: Session = Depends(get_session)):
    """
    Удаляет задачу по id.
    """
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(db_task)
    session.commit()
    return {"ok": True}
