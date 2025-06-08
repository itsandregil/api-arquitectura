import { createClient } from "redis";

export const client = createClient();

client.on("error", (error) => console.error("Redis Client Error", error));

export const initRedis = async () => {
  await client.connect();
};
