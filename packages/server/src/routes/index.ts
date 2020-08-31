import { Application } from 'express';

import UsersRoute from './user.routes';
import TeamRoute from './team.routes';
import ListenServerRoute from './listenServer.routes';

export default (app: Application): void => {
  app.use('/user', UsersRoute);
  app.use('/team', TeamRoute);
  app.use('/server/listen', ListenServerRoute);
};
