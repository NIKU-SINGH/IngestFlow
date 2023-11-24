import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const redpanda = new Kafka({
  brokers: ["localhost:19092"],
});
const consumer = redpanda.consumer({ groupId: uuidv4() });

export async function Consumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "log-ingestor", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Check if the message has a value
        if (message.value) {
          try {
            const messageValue = message.value.toString(); // Convert the buffer to a string
            const parsedMessage = JSON.parse(messageValue); // Parse the string as JSON

            console.log(parsedMessage); // Log the parsed JSON
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        } else {
          console.warn("Message has no value"); 
        }
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
Consumer()
// export async function disconnect() {
//   try {
//     await consumer.disconnect();
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
