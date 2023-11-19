import { Kafka } from "kafkajs";
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

const admin = redpanda.admin();
export async function createTopic(
  topic: string,
  partitions?: number,
  replicas?: number
) {
  console.log("Connecting to Admin ....")
  await admin.connect();
  const existingTopics = await admin.listTopics();
  if (!existingTopics.includes(topic)) {
    console.log("Creating topic ....")
    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: partitions ? partitions : 1,
          replicationFactor: replicas ? replicas : 1,
        },
      ],
    });
  }
  await admin.disconnect();
}