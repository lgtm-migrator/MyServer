import { Router } from 'express';

import TeamController from '../controller/TeamController';

const Team = Router();

Team.get('/', (req, res) => {
  res.json({});
});
Team.post('/', TeamController.create);
export default Team;
