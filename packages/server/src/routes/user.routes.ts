import { Router } from 'express';

import UserController from '../controller/UserController';

const User = Router();

User.get('/', UserController.index);
User.post('/register', UserController.register);
User.post('/authenticate', UserController.authenticate);

User.post('/password', UserController.getNewPassword);
User.put('/password/confirm', UserController.setNewPassword);

export default User;
