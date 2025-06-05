from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routes import router  # импорт маршрутов

app = FastAPI(
    title="ToDo Manager",
    description="Минималистичный ToDo API на FastAPI + SQLModel",
    version="0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# 👇 Подключаем маршруты с префиксом
app.include_router(router, prefix="/api")