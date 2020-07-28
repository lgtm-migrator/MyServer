//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js
//https://github.com/rconjoe/pm2panel/blob/master/pm2panel.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import getProcessPM2 from './services/getProcess';
import connection from './database/connection'/

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

import routes from './Routes';
routes(app)

const port = process.env.PORT || 4404;

export default async () => {
    let processList = await getProcessPM2();
    await connection('processList')
        .insert({
		idProcess: processList.pid,
		name: processList.name,
		nodeVersion: processList.node_version,
		versioning: processList.versioning,
		version: processList.version,
		unstableRestarts: processList.unstable_restarts,
		status: processList.status,
        })
        
    app.listen(port, () => {
        console.log(`HTTP server is listening on :${port}`);
    });
}