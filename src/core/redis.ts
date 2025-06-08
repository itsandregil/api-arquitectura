import { createClient } from "redis";
import config from "./config";

export const client = createClient({ url: config.redisUrl });

client.on("error", (error) => console.error("Redis Client Error", error));

export const initRedis = async () => {
  await client.connect();
};
