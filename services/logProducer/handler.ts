import * as Admin from "./createTopic";
import * as Producer from "./producer";
import LogData from "./types/types";
import logger from './utils/logger/src/index'

export async function sendLogToProducer(logData: LogData) {
  const topic = "log-ingestor";
  logger.info(`Creating topic: ${topic}`)
  await Admin.createTopic(topic);
  logger.info("Connecting...");
 
  const produceLog = await Producer.getConnection();
  if (produceLog) {
    const data = {
      level: "error",
      message: "Failed to connect to DB",
      resourceId: "server-1234",
      timestamp: "2023-09-15T08:00:00Z",
      traceId: "abc-xyz-123",
      spanId: "span-456",
      commit: "5e5342f",
      metadata: {
        parentResourceId: "server-0987",
      },
    };
    logger.info("Connected Successfully to the broker");
    // produceLog(data);
  } else {
    logger.error("Failed to initialize produceLog function");
  }
}

