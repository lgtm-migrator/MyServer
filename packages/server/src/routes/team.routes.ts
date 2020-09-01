import { Router } from 'express';

import TeamController from '../controller/TeamController';

const Team = Router();

Team.get('/', TeamController.index);
Team.post('/', TeamController.create);
export default Team;
