import { Application } from 'express';

import ListenServerRoute from './ListenServerRoute';

export default (app: Application) => {
    app.use('/server/listen', ListenServerRoute)
}