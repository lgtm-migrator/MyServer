import express from 'express';
const routes = express.Router();

import ProcessController from '../controllers/ProcessController';


routes.get('/', ProcessController.index);
routes.get('/monit/:id', ProcessController.monitItem);
routes.get('/monit', ProcessController.monit);

routes.get('/:id', ProcessController.getItem);

export default routes;