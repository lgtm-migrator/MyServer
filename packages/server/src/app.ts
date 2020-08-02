//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js
//https://github.com/rconjoe/pm2panel/blob/master/pm2panel.js

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import routes from './Routes';
routes(app)


export default app;