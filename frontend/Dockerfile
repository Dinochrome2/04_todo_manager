# Stage 1: Сборка фронтенда
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Подготовка статических файлов
FROM alpine AS static-export
WORKDIR /srv/frontend
COPY --from=build /app/dist ./
