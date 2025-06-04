# Сборка Vue
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Продакшен с Caddy
FROM caddy:alpine

COPY --from=build /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy-custom/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy-custom/Caddyfile", "--adapter", "caddyfile"]
