from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field


class Task(SQLModel, table=True):
    """ORM-модель задачи для хранения в БД."""

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=200, description="Название задачи")
    description: str = Field(default="", max_length=1000, description="Описание задачи")
    importance: int = Field(default=1, description="Важность задачи (1 - низкая, 3 - высокая)")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Дата создания")
    deadline: Optional[datetime] = Field(default=None, description="Крайний срок исполнения")
