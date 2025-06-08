import "dotenv/config";
import { AppConfig } from "../types";

const config: AppConfig = {
  cacheExpirationTime: process.env.CACHE_EXPIRATION_TIME as unknown as number,
  agifyApiKey: process.env.AGIFY_API_KEY as string,
  hostUrl: process.env.URL || "localhost",
  port: process.env.PORT || 3000,
  limiter: {
    windowMs: process.env.LIMITER_WINDOW_MS as unknown as number,
    maxRequests: process.env.LIMITER_MAX_REQUESTS as unknown as number,
  },
};

export default config;
