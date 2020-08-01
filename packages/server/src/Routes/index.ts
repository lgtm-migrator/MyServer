import {Express} from 'express';
import {errors} from 'celebrate';

import PullController from '../controllers/PullController';

import UserRoute from './UserRoute';

import middlewares from '../middlewares/auth';

export default (app: Express) => {
    app.use('/user', UserRoute);
    app.use('/pull', PullController.index);


    app.use(errors());
};