import { Client, ApiResponse } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();
const elasticUrl: string = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient: Client = new Client({ node: elasticUrl });
const index: string = "quotes";
const type: string = "quotes";

/**
 * @function createIndex
 * @param {string} newIndex - The name of the index to be created
 * @returns {Promise<void>}
 * @description Creates an index in ElasticSearch.
 */
async function createIndex(newIndex: string): Promise<void> {
  try {
    await esclient.indices.create({ index: newIndex });
    console.log(`Created index ${newIndex}`);
  } catch (err) {
    console.error(`An error occurred while creating the index ${newIndex}:`);
    console.error(err);
  }
}

/**
 * @function setQuotesMapping
 * @returns {Promise<void>}
 * @description Sets the quotes mapping to the database.
 */
async function setQuotesMapping(): Promise<void> {
  try {
    const schema = {
      quote: {
        type: "text" as const,
      },
      author: {
        type: "text" as const,
      },
    };

    await esclient.indices.putMapping({
      index,
      type,
      includeTypeName: true,
      body: {
        properties: schema,
      },
    });

    console.log("Quotes mapping created successfully");
  } catch (err) {
    console.error("An error occurred while setting the quotes mapping:");
    console.error(err);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */
async function checkConnection(): Promise<boolean> {
  console.log("Checking connection to ElasticSearch...");
  let isConnected = false;
  while (!isConnected) {
    try {
      await esclient.cluster.health({});
      console.log("Successfully connected to ElasticSearch");
      isConnected = true;
    } catch (_) {}
  }
  return true;
}

export { esclient, setQuotesMapping, checkConnection, createIndex, index, type };
