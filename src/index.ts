import http from "http";

import app from "./app";

import logger from "./utils/logger";
import ENV_CONFIG from "./configs/env.config";

// import { RedisHelper } from "./helpers";

import { db } from "./db/setup";
import { scheduleCronJobs } from "./cronJobs";

const server = http.createServer(app);
const BACKEND_PORT = ENV_CONFIG.BACKEND_PORT || 3000;

scheduleCronJobs();

server.listen(BACKEND_PORT, () => {
  logger.log(
    "info",
    `[BACKEND LISTENING ON PORT:${BACKEND_PORT} ENV:${ENV_CONFIG.ENVIRONMENT}]`,
  );
});
