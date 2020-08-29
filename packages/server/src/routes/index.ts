import { Application } from 'express';

import UsersRoute from './UsersRoute';
import ListenServerRoute from './ListenServerRoute';

export default (app: Application): void => {
  app.use('/user', UsersRoute);
  app.use('/server/listen', ListenServerRoute);
};
