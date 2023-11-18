import * as express from 'express';
import { Request, Response } from 'express';
import logger from '../../utils/logger/src/index'

const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const appId: number = process.env.APPID ? parseInt(process.env.APPID) : 1111;

app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send('LogCollector is running Successfully');
});

app.post('/ingest', (req: Request, res: Response) => {
    try {
        const requestBody = JSON.stringify(req.body);
        logger.info(`Logs received are: ${requestBody}`);
        res.send(requestBody);
    } catch (error) {
        logger.error(`Error logging request body: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: LogCollector is running at PORT${port} and APPID: ${appId}`);
});
