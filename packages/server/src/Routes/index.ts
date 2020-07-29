import {Express} from 'express';
import {errors} from 'celebrate';

import ProcessController from '../controllers/ProcessController';
import PullController from '../controllers/PullController';

import UserRoute from './UserRoute';
import UserProcess from './UserProcess';

import middlewares from '../middlewares/auth';

export default (app: Express) => {
    app.use('/user', UserRoute);
    app.use('/process', UserProcess);
    app.use('/list', ProcessController.index);
    app.use('/pull', PullController.index);


    app.use(errors());
};