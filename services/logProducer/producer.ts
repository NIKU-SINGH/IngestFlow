import { Kafka } from "kafkajs";
import LogData from "./types/types";

const redpanda = new Kafka({
  brokers: ["redpanda-0:9092","redpanda-1:9092","redpanda-2:9092"],
});

const producer = redpanda.producer();

export async function sendLogToProducer(message:LogData) {
  try {
    await producer.connect();
    await producer.send({
      topic: "log-ingestor",
      messages: [{ value: JSON.stringify({ message }) }],
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function disconnect() {
  try {
    await producer.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}
