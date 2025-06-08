# API Arquitectura de Software

API REST construida con **Express**, **TypeScript** y **Redis** como sistema de caché. Además, incluye protección contra abuso mediante **rate limiting**. Todo el entorno está contenerizado usando **Docker** y **Docker Compose**.

---

## 🧱 Tecnologías

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) como gestor de paquetes

---

## 📦 Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Ejemplo:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=supersecret
REDIS_URL=redis://redis:6379
CACHE_EXPIRATION_TIME=1000
AGIFY_API_KEY=apikey
LIMITER_WINDOW_MS=1000
LIMITER_MAX_REQUESTS=20
```

## Ejecutar con Docker

### 1. Construir y levantar los contenedores

```bash
docker-compose up --build
```

Esto levantará:

- La aplicación en http://localhost:3000
- Redis en el puerto 6379 (internamente accesible como redis)

### 2. Acceder a la API

```
http://localhost:3000
```

La API incluye:

- Respuestas cacheadas con Redis (GET /some-resource)
- Límites de peticiones (ej. 100 reqs por IP cada 15 minutos)

## Ejecutar Pruebas

Las pruebas unitarias están configuradas con Jest.

```bash
pnpm install
pnpm test
```

También se ejecutan automáticamente en **GitHub Actions** en cada push o PR a main.
