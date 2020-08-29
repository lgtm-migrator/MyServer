import { Router } from 'express';

import ListenServerController from '../controller/ListenServerController';

const ListenServer = Router();

ListenServer.get('/', ListenServerController.index);

ListenServer.post('/', ListenServerController.create);

ListenServer.put('/:id/', ListenServerController.edit);

ListenServer.delete('/:id/', ListenServerController.delete);

ListenServer.get('/:id/auth', ListenServerController.auth);

ListenServer.get('/:id/monit', ListenServerController.monit);

export default ListenServer;
