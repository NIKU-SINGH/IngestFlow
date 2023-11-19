import { Kafka } from "kafkajs";
import LogData from "./types/types";

const redpanda = new Kafka({
  brokers: ["localhost:19092"],
  
});
const producer = redpanda.producer();
export async function getConnection() {
  try {
    await producer.connect();
    return async (message: LogData, topic:string) => {
      await producer.send({
        topic,
        messages: [{ value: JSON.stringify({ message }) }],
      });
    };
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