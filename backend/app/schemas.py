from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel


class TaskCreate(SQLModel):
    """Схема для создания задачи (от клиента)."""

    title: str
    description: Optional[str] = ""
    importance: int = 1
    deadline: Optional[datetime] = None


class TaskRead(SQLModel):
    """Схема для вывода задачи (клиенту)."""

    id: int
    title: str
    description: str
    importance: int
    created_at: datetime
    deadline: Optional[datetime] = None


class TaskUpdate(SQLModel):
    """Схема для частичного обновления задачи."""

    title: Optional[str] = None
    description: Optional[str] = None
    importance: Optional[int] = None
    deadline: Optional[datetime] = None
