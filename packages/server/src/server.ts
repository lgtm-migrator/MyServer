//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js
//https://github.com/rconjoe/pm2panel/blob/master/pm2panel.js

import express from 'express';
import http from 'http';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();


import socker from './socker';

const app = express();
const port = process.env.PORT || 4404;
app.set("port", port);

let server = new http.Server(app);
socker(server);

app.use(cors());
app.use(express.json());

import routes from './Routes';
routes(app)


export default async () => {
    server.listen(port, function() {
      console.log(`listening on *:${port}`);
    });
}