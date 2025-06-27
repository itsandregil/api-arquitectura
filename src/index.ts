import app from "./app";
import config from "./core/config";
import { initRedis } from "./core/redis";

async function main() {
  try {
    // Wait for connection to chache
    await initRedis();

    const { port, hostUrl } = config;

    app.listen(port, () => {
      console.log(`Server listening in http://${hostUrl}:${port}/`);
    });
  } catch (error) {
    console.error("Error starting the server...");
  }
}

main();
