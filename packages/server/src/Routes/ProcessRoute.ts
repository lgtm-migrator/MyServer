import express from 'express';
const routes = express.Router();

import ProcessController from '../controllers/ProcessController';


routes.get('/', ProcessController.index);

routes.get('/monit/:id', ProcessController.monitItem);
routes.get('/monit', ProcessController.monit);

routes.get('/restart/:id', ProcessController.restart);
routes.get('/start/:id', ProcessController.start);
routes.get('/stop/:id', ProcessController.stop);


routes.get('/:id', ProcessController.getItem);

export default routes;