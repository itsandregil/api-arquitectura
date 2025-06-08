export interface HttpError extends Error {
  status?: number;
}

export interface AppConfig {
  hostUrl?: string;
  port?: number | string;
  agifyApiKey: string;
  cacheExpirationTime: number;
  limiter: LimiterConfig;
}

interface LimiterConfig {
  windowMs: number;
  maxRequests: number;
}
