from sqlmodel import create_engine, Session, SQLModel

DATABASE_URL = "sqlite:///../data/tasks.db"
engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables() -> None:
    """Создаёт таблицы в БД, если их нет."""
    SQLModel.metadata.create_all(engine)


def get_session() -> Session:
    """Генерирует сессию для работы с БД."""
    with Session(engine) as session:
        yield session
