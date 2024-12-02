import * as cron from "node-cron";

import logger from "./utils/logger";

export const scheduleCronJobs = () => {
  logger.info("CRON: Scheduling all cron jobs");
  const task1 = cron.schedule("0 0 */6 * *", function () {
    console.log("running a task every 6 hours...");
    // if the server is overloaded then we can just schedule cron job for checking in every 1 minute or two
  });
};
