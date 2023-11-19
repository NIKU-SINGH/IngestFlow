import { Kafka } from "kafkajs";
import LogData from "./types/types";
const ip = require('ip')

const host = process.env.HOST_IP || ip.address()

const redpanda = new Kafka({
  brokers: ['redpanda-0:19092', 'redpanda-1:29092','redpanda-2:39092'],
  clientId: 'producer',
  // retry: {
  //   maxRetryTime: 5000, // Maximum time in milliseconds to retry a connection
  //   initialRetryTime: 300, // Initial time to wait in milliseconds before retrying
  //   retries: 10, // Number of retries
  // },
});

const producer = redpanda.producer();

export async function sendLogToProducer(message: LogData) {
  try {
    await producer.connect();
    await producer.send({
      topic: "log-ingestor",
      messages: [{ value: JSON.stringify({ message }) }],
    });
  } catch (error) {
    if (error.name === "KafkaJSNumberOfRetriesExceeded") {
      console.error("Retries exceeded:", error);
    } else {
      console.error("Other Kafka error:", error);
    }
  } finally {
    await disconnect();
  }
}
export async function disconnect() {
  try {
    await producer.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}
