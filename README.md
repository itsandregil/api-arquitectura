# 🚀 Mi API con Node.js, TypeScript, Redis y Docker

API REST construida con **Express**, **TypeScript** y **Redis** como sistema de caché. Además, incluye protección contra abuso mediante **rate limiting**. Todo el entorno está contenerizado usando **Docker** y **Docker Compose**.

## 🧱 Tecnologías

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) como gestor de paquetes

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Ejemplo:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=supersecret
CACHE_EXPIRATION_TIME=1000
AGIFY_API_KEY=apikey
LIMITER_WINDOW_MS=1000
LIMITER_MAX_REQUESTS=20

# Si tienes un servicio de redis desplegado
REDIS_URL=redis-url
```

## ▶️ Ejecución en Local

### 1. Ejecutar Redis con Docker

Para agilizar el desarrollo sin necesidad de instalar redis de manera local, recomendamos usar Docker y correr el siguiente comando:

```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

### 2. Instalar dependencias y Ejecutar ambiente de desarrollo

```bash
pnpm install
pnpm run dev
```

Esto levantará:

- La aplicación en http://localhost:3000/

### 3. Acceder a la API

```
http://localhost:3000/
```

La API incluye:

- Respuestas cacheadas con Redis (GET /some-resource)
- Límites de peticiones (ej. 100 reqs por IP cada 15 minutos)

## 🧪 Ejecutar Pruebas

Las pruebas unitarias están configuradas con Jest.

```bash
pnpm install
pnpm test
```

También se ejecutan automáticamente en **GitHub Actions** en cada push o PR a main.
