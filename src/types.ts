export interface HttpError extends Error {
  status?: number;
}

export interface AppConfig {
  hostUrl?: string;
  port?: number | string;
  agifyApiKey: string;
  cacheExpirationTime: number;
  limiter: LimiterConfig;
  redisUrl?: string;
}

interface LimiterConfig {
  windowMs: number;
  maxRequests: number;
}

export interface AgifyResponse {
  count: number;
  name: string;
  age: number;
}
