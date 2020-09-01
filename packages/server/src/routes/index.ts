import { Application } from 'express';

import UsersRoute from './user.routes';
import TeamRoute from './team.routes';
import ListenServerRoute from './listenServer.routes';

import MiddlewareAuth from '../middleware/auth';

export default (app: Application): void => {
  app.use('/user', UsersRoute);
  app.use('/team', MiddlewareAuth, TeamRoute);
  app.use('/server/listen', MiddlewareAuth, ListenServerRoute);
};
