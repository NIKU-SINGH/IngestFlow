import * as Admin from "./admin";
import * as Producer from "./producer";
import LogData from "./types/types";
import logger from "./utils/logger/src/index";

export async function sendLogToProducer(logData: LogData) {
  const topic: string = "log-ingestor";
  const partitions: number = 1;
  const replicas: number = 1;
  logger.info(`Creating topic: ${topic}`);
  await Admin.createTopic(topic, partitions, replicas);
  logger.info("Connecting...");

  const produceLog = await Producer.getConnection();
  if (produceLog) {
    const data:LogData  =  logData
    logger.info("Connected Successfully to the broker");
    produceLog(data, topic);
  } else {
    logger.error("Failed to initialize produceLog function");
  }
}
