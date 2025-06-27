import app from "./app";
import config from "./core/config";
import { initRedis } from "./core/redis";

async function main() {
  try {
    // Wait for connection to chache
    await initRedis();

    const { port, hostUrl } = config;

    app.listen(port, () => {
      console.log(`API listening in http://${hostUrl}:${port}/api`);
      console.log(`API Docs in http://${hostUrl}:${port}/docs`);
    });
  } catch (error) {
    console.error("Error starting the server...");
  }
}

main();
