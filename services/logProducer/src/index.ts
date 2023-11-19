import * as express from 'express';
import { Request, Response } from 'express';
import logger from './utils/logger/src/index'
import { sendLogToProducer } from './handler';
import LogData from './types/types';

const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const appId: number = process.env.APPID ? parseInt(process.env.APPID) : 1111;

app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send(`⚡️[server]: LogCollector is running at PORT:${port} and APPID: ${appId}`);
});

app.post('/ingest', async (req: Request, res: Response) => {
    try {
        const requestBody: LogData = req.body;
        logger.info(`Logs received are: ${JSON.stringify(requestBody)}`);
        await sendLogToProducer(requestBody);
        res.status(200).send(`Log data received successfully`);
    } catch (error) {
        logger.error(`Error logging request body: ${error.stack}`);
        res.status(500).send(`Internal Server Error: ${error}`);
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: LogCollector is running at PORT:${port} and APPID: ${appId}`);
});
