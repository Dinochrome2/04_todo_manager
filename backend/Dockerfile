FROM python:3.13-slim-bookworm

# Копируем uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Настройки окружения
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Рабочая директория
WORKDIR /app

# Устанавливаем curl (для healthcheck) for uv for docker-compose когда запускаем вместе с фронтом
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Устанавливаем зависимости
COPY pyproject.toml uv.lock /app/
RUN uv sync --frozen --no-cache

# Копируем исходники приложения
COPY ./app /app
COPY ./data /data

# Запускаем через uv run, как python runner
CMD ["uv", "run", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
