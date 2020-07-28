import {Request, Response} from 'express';
import pm2, {ProcessDescription} from 'pm2';

import getProcess from '../services/getProcess.ts';

const ListController = {
    index: async (req: Request, res: Response) => {
        
        let listProcess: Array<ProcessDescription> = await getProcess();

        return res.status(200).json(listProcess);
    }
}

export default ListController;

