import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import router from './routes';
router(app);

export default app;